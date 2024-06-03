using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IMemeService _memeService;
        private readonly IUnitOfWork _unitOfWork;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService, IMemeService memeService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _memeService = memeService;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
            userParams.CurrentUsername = User.GetUsername();

            if (string.IsNullOrEmpty(userParams.Gender))
                userParams.Gender = gender == "male" ? "female" : "male";

            var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var currentUsername = User.GetUsername();
            return await _unitOfWork.UserRepository.GetMemberAsync(username,
                isCurrentUser: currentUsername == username
            );
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _unitOfWork.UserRepository.Update(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        // Photos

        // [HttpPost("add-photo")]
        // public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        // {
        //     var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

        //     var result = await _photoService.AddPhotoAsync(file);

        //     if (result.Error != null) return BadRequest(result.Error.Message);

        //     var photo = new Photo
        //     {
        //         Url = result.SecureUrl.AbsoluteUri,
        //         PublicId = result.PublicId
        //     };

        //     user.Photos.Add(photo);

        //     if (await _unitOfWork.Complete())
        //     {
        //         return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
        //     }

        //     return BadRequest("Problem addding photo");
        // }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(PhotoDto photoDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = new Photo
            {
                Url = photoDto.Url,
                IsMain = true
            };

            user.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem addding photo");
        }

        [HttpPut("update-photo/{photoId}")]
        public async Task<ActionResult> UpdatePhoto(PhotoUpdateDto photoUpdateDto, int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            _mapper.Map(photoUpdateDto, user);

            // _unitOfWork.ExpensesRepository.Update(comment);
            photo.Url = photoUpdateDto.Url;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się zmienić zdjęcia");
        }

        

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            // if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete the photo");
        }

        [HttpPost("submit-contact-form")]
        [AllowAnonymous]
        public async Task<ActionResult<ContactFormDto>> SubmitMessage([FromBody] ContactFormDto contactFormDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(1);

            var contactForm = new ContactForm
            {
                SenderName = contactFormDto.SenderName,
                SenderEmail = contactFormDto.SenderEmail,
                Subject = contactFormDto.Subject,
                Message = contactFormDto.Message
            };

            user.Messages.Add(contactForm);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ContactFormDto>(contactForm));
            }

            return BadRequest("Problem z wysyłaniem wiadomości");
        }

        [HttpGet("search-members/{searchString}")]
        public async Task<ActionResult<IEntityTypeConfiguration<MemberDto>>> SearchForMembers([FromQuery] UserParams userParams, string searchString)
        {
            var members = await _unitOfWork.UserRepository.SearchForMembers(userParams, searchString);

            Response.AddPaginationHeader(members.CurrentPage, members.PageSize, 
                members.TotalCount, members.TotalPages);

            return Ok(members);
        }

        [HttpGet("get-notifications/{username}")]
        public async Task<ActionResult<IEntityTypeConfiguration<NotificationDto>>> GetNotifications(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var notifications = await _unitOfWork.UserRepository.GetNotifications(user.Id);

            return Ok(notifications);
        }

        [HttpPost("mark-notification-as-read/{notificationId}")]
        public async Task<ActionResult> MarkNotificationAsRead(int notificationId)
        {
            var notification = await _unitOfWork.UserRepository.GetNotificationById(notificationId);

            if (notification == null) return NotFound("Could not find notification");

            if (notification.IsRead) return Ok();

            notification.IsRead = true;

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Nie można otworzyć notyfikacji");
        }

        [HttpGet("get-unread-notifications/{username}")]
        public async Task<ActionResult<IEntityTypeConfiguration<NotificationDto>>> GetUnreadNotifications(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var notifications = await _unitOfWork.UserRepository.GetUnreadNotifications(user.Id);

            return Ok(notifications);
        }

        [HttpPost("remove-notification/{notificationId}")]
        public async Task<ActionResult> RemoveNotification(int notificationId)
        {
            var notification = await _unitOfWork.UserRepository.GetNotificationById(notificationId);

            if (notification == null) return NotFound("Nie można znaleźć powiadomienia");

            _unitOfWork.UserRepository.RemoveNotification(notification);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpGet("get-user-email-by-id/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmailById(int userId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);

            return Ok(user);
        }

        [HttpGet("get-categories")]
        public async Task<ActionResult> GetUserCategories()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var category = new Category();

            var categories = await _unitOfWork.ExpensesRepository.GetCategories(user.UserName);

            var contributors = await _unitOfWork.ExpensesRepository.GetContributors();
            Contributors[] contributorsArray = new Contributors[100];
            var i = 0;

            foreach(var contributor in contributors)
            {
                if (contributor.Username == user.UserName)
                {
                    contributorsArray[i] = contributor;
                    i++;
                }
            }

            Category[] categoryArray = new Category[100];
            var j = 0;

            foreach(var contributor in contributorsArray?.Where(o => o != null))
            {
                category = await _unitOfWork.ExpensesRepository.GetCategoryById(contributor.CategoryId);
                categoryArray[j] = category;
                j++;
            }

            categories = categories.Concat(categoryArray?.Where(o => o != null));

            return Ok(categories.Distinct());
        }

        [HttpGet("get-closed-categories")]
        public async Task<ActionResult> GetUserClosedCategories()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var categories = await _unitOfWork.ExpensesRepository.GetClosedCategories(user.UserName);

            return Ok(categories);
        }


        [HttpGet("get-expenses/{categoryId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetExpenses(int categoryId)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var expenses = await _unitOfWork.ExpensesRepository.GetCategoryExpenses(categoryId);

            return Ok(expenses);
        }

        [HttpGet("get-contributors/{categoryId}")]
        public async Task<ActionResult> GetContributors(int categoryId)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var contributors = await _unitOfWork.ExpensesRepository.GetCategoryContributors(categoryId);

            return Ok(contributors);
        }

        [HttpGet("get-user-expenses/{categoryId}/{contributorUsername}")]
        public async Task<ActionResult> GetContributorExpenses(int categoryId, string contributorUsername)
        {
            var expenses = await _unitOfWork.ExpensesRepository.GetContributorExpenses(categoryId, contributorUsername);

            return Ok(expenses);
        }

        [HttpGet("get-user-expenses-sum/{categoryId}/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserExpensesSum(int categoryId, string username)
        {
            var expenses = await _unitOfWork.ExpensesRepository.GetContributorExpenses(categoryId, username);
            float[] expensesArray = new float[100];
            int i = 1;

            foreach(var expense in expenses)
            {
                expensesArray[i] = expense.Amount;
                i++;
            }

            return Ok(expensesArray.Sum());
        }

        [HttpGet("get-category-expenses/{categoryId}")]
        public async Task<ActionResult> GetCategoryExpenses(int categoryId)
        {
            var expenses = await _unitOfWork.ExpensesRepository.GetCategoryExpenses(categoryId);

            return Ok(expenses);
        }

        [HttpGet("get-category-expenses-sum/{categoryId}")]
        public async Task<ActionResult> GetCategoryExpensesSum(int categoryId)
        {
            var expenses = await _unitOfWork.ExpensesRepository.GetCategoryExpenses(categoryId);
            float[] expensesArray = new float[100];
            int i = 1;

            foreach(var expense in expenses)
            {
                expensesArray[i] = expense.Amount;
                i++;
            }

            return Ok(expensesArray.Sum());
        }

        [HttpGet("get-user-spendings/{categoryId}/{username}")]
        public async Task<ActionResult> GetUserSpendings(int categoryId, string username)
        {
            var spendings = await _unitOfWork.ExpensesRepository.GetUserSpendings(categoryId, username);

            return Ok(spendings);
        }

        [HttpGet("get-user-spendings-sum/{categoryId}/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserSpendingsSum(int categoryId, string username)
        {
            var spendings = await _unitOfWork.ExpensesRepository.GetUserSpendings(categoryId, username);
            float[] spendingsArray = new float[100];
            int i = 1;

            foreach(var spending in spendings)
            {
                spendingsArray[i] = spending.Amount;
                i++;
            }

            return Ok(spendingsArray.Sum());
        }

        [HttpGet("get-expense-spendings/{expenseId}")]
        public async Task<ActionResult> GetExpenseSpendings(int expenseId)
        {
            var spendings = await _unitOfWork.ExpensesRepository.GetExpenseSpendings(expenseId);

            return Ok(spendings);
        }

        [HttpGet("get-expense-spendings-sum/{expenseId}")]
        public async Task<ActionResult> GetExpenseSpendingsSum(int expenseId)
        {
            var spendings = await _unitOfWork.ExpensesRepository.GetExpenseSpendings(expenseId);
            float[] spendingsArray = new float[100];
            int i = 1;

            foreach(var spending in spendings)
            {
                spendingsArray[i] = spending.Amount;
                i++;
            }

            return Ok(Math.Round(spendingsArray.Sum()));
        }

        [HttpGet("check-if-contributors-available/{categoryId}/{expenseId}")]
        public async Task<ActionResult> CheckIfContributorsAvailable(int categoryId, int expenseId)
        {
            var spendings = await _unitOfWork.ExpensesRepository.GetExpenseSpendings(expenseId);

            string[] spendingsArray = new string[100];
            int i = 1;

            foreach(var spending in spendings)
            {
                spendingsArray[i] = spending.WhoOwes;
                i++;
            }

            var contributors = await _unitOfWork.ExpensesRepository.GetCategoryContributors(categoryId);

            string[] contributorsArray = new string[100];
            int j = 1;

            foreach(var contributor in contributors)
            {
                contributorsArray[j] = contributor.Username;
                j++;
            }

            var one = spendingsArray.Where(c => c != null).ToArray();
            var two = contributorsArray.Where(c => c != null).ToArray();


            two = two.Where(x => !one.Contains(x)).ToArray();

            return Ok(two);
        }

        [HttpGet("who-owes-who/{categoryId}/{whoPaid}/{whoOwes}")]
        [AllowAnonymous]
        public async Task<ActionResult> WhoOwesWho(int categoryId, string whoPaid, string whoOwes)
        {
            var debts = await _unitOfWork.ExpensesRepository.WhoOwesWho(categoryId, whoPaid, whoOwes);

            var debts2 = await _unitOfWork.ExpensesRepository.WhoOwesWho(categoryId, whoOwes, whoPaid);

            float[] debtsArray = new float[100];
            int i = 1;

            foreach(var debt in debts)
            {
                debtsArray[i] = debt.Amount;
                i++;
            }

            float[] debts2Array = new float[100];
            int j = 1;

            foreach(var debt2 in debts2)
            {
                debts2Array[j] = debt2.Amount;
                j++;
            }

            return Ok(debtsArray.Sum() - debts2Array.Sum());
        }

        [HttpPost("add-category-photo/{categoryId}")]
        public async Task<ActionResult<CategoryPhotoDto>> AddCategoryPhoto(IFormFile file, int categoryId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var category = await _unitOfWork.ExpensesRepository.GetCategoryById(categoryId);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new CategoryPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                CategoryId = category.Id
            };

            // if (category.PhotoUrl != null) 
            // {
            //     await _photoService.DeletePhotoAsync(cate)
            // }

            category.PhotoUrl = result.SecureUrl.AbsoluteUri;

            user.CategoryPhotos.Add(photo);
            category.CategoryPhotos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { user = user.UserName }, _mapper.Map<CategoryPhotoDto>(photo));
            }

            return BadRequest("Problem addding photo");
        }

        // ToDoList
        [HttpGet("get-to-do-list")]
        public async Task<ActionResult> GetToDoListTasks()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var tasks = await _unitOfWork.ToDoListRepository.GetToDoListTasks(user.UserName);

            return Ok(tasks);
        }

        [HttpGet("get-daily-to-do-list")]
        public async Task<ActionResult> GetDailyToDoListTasks()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var tasks = await _unitOfWork.ToDoListRepository.GetDailyToDoListTasks(user.UserName);

            return Ok(tasks);
        }

        
        [HttpGet("get-daily-group-to-do-list/{groupId}")]
        public async Task<ActionResult> GetDailyGroupToDoListTasks(int groupId)
        {
            var tasks = await _unitOfWork.ToDoListRepository.GetDailyGroupToDoListTasks(groupId);

            return Ok(tasks);
        }

        [HttpGet("get-tasks-filter/{from}/{to}")]
        public async Task<ActionResult> GetTasksFilter(DateTime from, DateTime to)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var tasks = await _unitOfWork.ToDoListRepository.GetTasksFilter(user.UserName, from, to);

            return Ok(tasks);
        }

        [HttpGet("get-group-tasks-filter/{from}/{to}/{groupId}")]
        public async Task<ActionResult> GetGroupTasksFilter(DateTime from, DateTime to, int groupId)
        {

            var tasks = await _unitOfWork.ToDoListRepository.GetGroupTasksFilter(from, to, groupId);

            return Ok(tasks);
        }

        // [HttpGet("get-groups")]
        // public async Task<ActionResult> GetUserGroups()
        // {
        //     var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

        //     var groups = await _unitOfWork.ToDoListRepository.GetGroups(user.UserName);

        //     return Ok(groups);
        // }

        [HttpGet("get-groups")]
        public async Task<ActionResult> GetUserGroups()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var group = new TasksGroup();

            // var categories = await _unitOfWork.ExpensesRepository.GetCategories(username);

            var contributors = await _unitOfWork.ToDoListRepository.GetContributors();
            ToDoListContributors[] contributorsArray = new ToDoListContributors[100];
            var i = 0;

            foreach(var contributor in contributors)
            {
                if (contributor.Username == user.UserName)
                {
                    contributorsArray[i] = contributor;
                    i++;
                }
            }

            TasksGroup[] groupArray = new TasksGroup[100];
            var j = 0;

            foreach(var contributor in contributorsArray?.Where(o => o != null))
            {
                group = await _unitOfWork.ToDoListRepository.GetGroupById(contributor.GroupId);
                groupArray[j] = group;
                j++;
            }

            return Ok(groupArray?.Where(o => o != null));
        }

        [HttpGet("get-group-contributors/{groupId}")]
        public async Task<ActionResult> GetGroupContributors(int groupId)
        {
            var contributors = await _unitOfWork.ToDoListRepository.GetGroupContributors(groupId);

            return Ok(contributors);
        }

        [HttpGet("get-to-do-list-group-tasks/{groupId}")]
        public async Task<ActionResult> GetToDoListGroupTasks(int groupId)
        {
            var tasks = await _unitOfWork.ToDoListRepository.GetToDoListGroupTasks(groupId);

            return Ok(tasks);
        }

    }
}