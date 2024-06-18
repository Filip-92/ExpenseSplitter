using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ExpensesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IMemeService _memeService;
        private readonly IUnitOfWork _unitOfWork;
        public ExpensesController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService, IMemeService memeService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _memeService = memeService;
            _mapper = mapper;
        }

        [HttpPost("mark-notification-as-read/{notificationId}")]
        public async Task<ActionResult> MarkNotificationAsRead(int notificationId)
        {
            var notification = await _unitOfWork.UserRepository.GetNotificationById(notificationId);

            if (notification == null) return NotFound("Could not find notification");

            notification.IsRead = true;

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Nie można otworzyć notyfikacji");
        }

        public async Task<ActionResult<NotificationDto>> SendNotification(int groupId, AppUser user, string message)
        {
            BadRequest(user);

            var notification = new Notifications
            {
                Content = message,
                GroupId = groupId,
                AppUserId = user.Id
            };

            user.Notifications.Add(notification);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<NotificationDto>(notification));
            }

            return BadRequest("Problem z wysłaniem powiadomienia");
        }

        [HttpGet("get-user-photo/{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult<PhotoDto>> GetPhoto(int userId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetUserPhoto(userId);

            if (photo != null)
            {
                return Ok(photo);
            }
            else 
            {
                return NoContent();
            }
        }

        [HttpGet("get-user-photo-by-name")]
        [AllowAnonymous]
        public async Task<ActionResult<PhotoDto>> GetPhotoByName()
        {
            var sourceUserId = User.GetUserId();

            var photo = await _unitOfWork.PhotoRepository.GetUserPhoto(sourceUserId);

            if (photo != null)
            {
                return Ok(photo);
            }
            else 
            {
                return NoContent();
            }
        }

        [HttpGet("get-new-user-photo/{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult<PhotoDto>> GetNewPhoto(int userId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetNewUserPhoto();

            if (photo != null)
            {
                return Ok(photo);
            }
            else 
            {
                return NoContent();
            }
        }

        [HttpGet("get-user-photo-by-username/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<PhotoDto>> GetPhotoByUsername(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var photo = await _unitOfWork.PhotoRepository.GetUserPhoto(user.Id);

            if (photo != null)
            {
                return Ok(photo);
            }
            else 
            {
                return NoContent();
            }
        }

        // Expense Categories
        [HttpPost("add-expense-category")]
        public async Task<ActionResult<CategoryDto>> AddCategory(CategoryDto categoryDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var category = new Category
            {
                Id = categoryDto.Id,
                Name = categoryDto.Name,
                Username = user.UserName
            };

            user.Categories.Add(category);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<CategoryDto>(category));
            }

            return BadRequest("Problem z dodawaniem kategorii");
        }

        [HttpPost("remove-category/{categoryId}")]
        public async Task<ActionResult> RemoveCategory(int categoryId)
        {
            var category = await _unitOfWork.ExpensesRepository.GetCategoryById(categoryId);

            if (category == null) return NotFound("Nie znaleziono kategorii");

            _unitOfWork.UserRepository.RemoveCategory(category);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPost("add-expense-amount")]
        public async Task<ActionResult<ExpensesDto>> AddExpenseAmount(ExpensesDto expensesDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var category = await _unitOfWork.ExpensesRepository.GetCategoryById(expensesDto.CategoryId);

            var expenses = new Expenses
            {
                Id = expensesDto.Id,
                Amount = expensesDto.Amount,
                Name = expensesDto.Name,
                WhoPaid = expensesDto.WhoPaid,
                CategoryId = expensesDto.CategoryId
            };

            user.Expenses.Add(expenses);
            category.Expenses.Add(expenses);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ExpensesDto>(expenses));
            }

            return BadRequest("Problem z dodawaniem wydatku");
        }

        [HttpPost("remove-expense/{expenseId}")]
        public async Task<ActionResult> RemoveExpense(int expenseId)
        {
            var expense = await _unitOfWork.ExpensesRepository.GetExpenseById(expenseId);

            if (expense == null) return NotFound("Could not find expense");

            _unitOfWork.UserRepository.RemoveExpense(expense);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-category-name/{categoryId}")]
        public async Task<ActionResult> UpdateCategoryName(CategoryUpdateDto categoryUpdateDto, int categoryId)
        {
            var category = await _unitOfWork.ExpensesRepository.GetCategoryById(categoryId);

            // _unitOfWork.ExpensesRepository.Update(comment);
            category.Name = categoryUpdateDto.Name;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować kategorii");
        }

        [HttpPost("add-contributor")]
        public async Task<ActionResult<ContributorsDto>> AddContributor(ContributorsDto contributorsDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var contributors = await _unitOfWork.ExpensesRepository.GetCategoryContributors(contributorsDto.CategoryId);

            foreach(var cont in contributors)
            {
                if (cont.Email == contributorsDto.Email)
                {
                    return BadRequest("Istnieje już użytkownik o takiej nazwie w danej grupie");
                }
            }

            var contributor = new Contributors
            {
                Id = contributorsDto.Id,
                Username = contributorsDto.Username,
                Email = contributorsDto.Email,
                CategoryId = contributorsDto.CategoryId
            };

            user.Contributors.Add(contributor);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ContributorsDto>(contributor));
            }

            return BadRequest("Problem z dodawaniem użytkownika");
        }

        [HttpPost("remove-contributor/{contributorId}")]
        public async Task<ActionResult> RemoveContributor(int contributorId)
        {
            var contributor = await _unitOfWork.ExpensesRepository.GetContributorById(contributorId);

            if (contributor == null) return NotFound("Could not find contributor");

            _unitOfWork.UserRepository.RemoveExpensesContributor(contributor);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-contributor/{contributorId}")]
        public async Task<ActionResult> UpdateContributor(UpdateExpensesContributorDto updateContributorDto, int contributorId)
        {
            var contributor = await _unitOfWork.ExpensesRepository.GetContributorById(contributorId);

            var contributors = await _unitOfWork.ExpensesRepository.GetCategoryContributors(updateContributorDto.CategoryId);

            foreach(var cont in contributors)
            {
                if (cont.Username == updateContributorDto.Username.ToLower())
                {
                    return BadRequest("Istnieje już użytkownik o takiej nazwie w danej kategorii");
                }
            }

            var expenses = await _unitOfWork.ExpensesRepository.GetCategoryExpenses(updateContributorDto.CategoryId);

            foreach(var expense in expenses)
            {
                var spendings = await _unitOfWork.ExpensesRepository.GetExpenseSpendings(expense.Id);
                foreach(var spending in spendings)
                {
                    if(spending.WhoPaid == contributor.Username)
                    {
                        spending.WhoPaid = updateContributorDto.Username;
                    }
                    if (spending.WhoOwes == contributor.Username)
                    {
                        spending.WhoOwes = updateContributorDto.Username;
                    }
                }
                if (expense.WhoPaid == contributor.Username)
                {
                    expense.WhoPaid = updateContributorDto.Username;
                }
            }

            // _unitOfWork.ToDoListRepository.Update(comment);
            contributor.Username = updateContributorDto.Username;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować wariata");
        }

        [HttpPost("add-spending")]
        public async Task<ActionResult<SpendingsDto>> AddSpending(SpendingsDto spendingsDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var spending = new Spendings
            {
                Id = spendingsDto.Id,
                WhoPaid = spendingsDto.WhoPaid,
                WhoOwes = spendingsDto.WhoOwes,
                Amount = spendingsDto.Amount,
                ExpenseId = spendingsDto.ExpenseId,
                CategoryId = spendingsDto.CategoryId
            };

            user.Spendings.Add(spending);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<SpendingsDto>(spending));
            }

            return BadRequest("Problem z dodawaniem wydatku");
        }

        [HttpPost("remove-spending/{spendingId}")]
        public async Task<ActionResult> RemoveSpending(int spendingId)
        {
            var spending = await _unitOfWork.ExpensesRepository.GetSpendingById(spendingId);

            if (spending == null) return NotFound("Could not find spending");

            _unitOfWork.UserRepository.RemoveSpending(spending);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-spending-amount/{spendingId}/{spendingAmount}")]
        public async Task<ActionResult> UpdateSpending(int spendingId, float spendingAmount)
        {
            var spending = await _unitOfWork.ExpensesRepository.GetSpendingById(spendingId);

            spending.Amount = spendingAmount;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować kwoty");
        }

        [HttpPut("close-category/{categoryId}")]
        public async Task<ActionResult> CloseCategoryName(int categoryId)
        {
            var category = await _unitOfWork.ExpensesRepository.GetCategoryById(categoryId);

            category.IsClosed = !category.IsClosed;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować kategorii");
        }
    }
}