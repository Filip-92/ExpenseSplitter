using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;
        private readonly IMemeService _memeService;
        public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, 
            IPhotoService photoService, IMemeService memeService, IMapper mapper,
            DataContext context)
        {
            _photoService = photoService;
            _memeService = memeService;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList(),
                    IsBanned = u.IsBanned
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("get-users")]
        public async Task<ActionResult<IEntityTypeConfiguration<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var users = await GetUsersRepository(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, 
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        public async Task<PagedList<MemberDto>> GetUsersRepository(UserParams userParams)
        {
            var query = _context.Users
                .IgnoreQueryFilters()
                .Select(u => new MemberDto
                {
                    Id = u.Id,
                    Username = u.UserName,
                }).AsNoTracking()
                .OrderBy(u => u.Id);

            return await PagedList<MemberDto>.CreateAsync(query,
            userParams.PageNumber, userParams.PageSize);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("search-users/{searchString}")]
        public async Task<ActionResult<IEntityTypeConfiguration<MemberDto>>> SearchForUsers([FromQuery] UserParams userParams, string searchString)
        {
            var users = await SearchForUsersRepository(userParams, searchString);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, 
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        public async Task<PagedList<MemberDto>> SearchForUsersRepository(UserParams userParams, string searchString)
        {
            var query = _context.Users
                .IgnoreQueryFilters()
                .Where(u => u.UserName.ToLower().Contains(searchString))
                .Select(u => new MemberDto
                {
                    Id = u.Id,
                    Username = u.UserName,
                }).AsNoTracking()
                .OrderBy(u => u.Id);

            return await PagedList<MemberDto>.CreateAsync(query,
            userParams.PageNumber, userParams.PageSize);

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("get-user-with-roles/{username}")]
        public async Task<ActionResult> GetUserWithRoles(string username)
        {
            var user = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Where(u => u.UserName == username)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList(),
                    IsBanned = u.IsBanned
                }).SingleOrDefaultAsync();

            return Ok(user);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public async Task<ActionResult> GetPhotosForModeration()
        {
            var photos = await _unitOfWork.PhotoRepository.GetUnapprovedPhotos();

            return Ok(photos);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approve-photo/{photoId}")]
        public async Task<ActionResult> ApprovePhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            if (photo == null) return NotFound("Could not find photo");

         //   photo.IsApproved = true;

            var user = await _unitOfWork.UserRepository.GetUserByPhotoId(photoId);

            if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("reject-photo/{photoId}")]
        public async Task<ActionResult> RejectPhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            if (photo == null) return NotFound("Could not find photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Result == "ok")
                {
                    _unitOfWork.PhotoRepository.RemovePhoto(photo);
                }
            }
            else
            {
                _unitOfWork.PhotoRepository.RemovePhoto(photo);
            }

            await _unitOfWork.Complete();

            return Ok();
        }

        public async Task<ActionResult<NotificationDto>> SendNotification(int memeId, AppUser user)
        {
            var notification = new Notifications
            {
                Content = "Twój mem został dodany na stronę główną",
                MemeId = memeId,
                AppUserId = user.Id
            };

            user.Notifications.Add(notification);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<NotificationDto>(notification));
            }

            return BadRequest("Problem adding meme");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("remove-message/{messageId}")]
        public async Task<ActionResult> RemoveMessage(int messageId)
        {
            var message = await _unitOfWork.UserRepository.GetMessageById(messageId);

            if (message == null) return NotFound("Could not find message");

            _unitOfWork.UserRepository.RemoveMessage(message);

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("remove-user/{username}")]
        public async Task<ActionResult> RemoveUser(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            if (user == null) return NotFound("Nie znaleziono użytkownika");

            await _userManager.UpdateSecurityStampAsync(user);

            new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = null,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Gender = user.Gender
            };

            var result = _userManager.DeleteAsync(user);

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("ban-user/{username}/{days}")]
        public async Task<ActionResult> BanUser(string username, int days, MemberDto memberDto)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            user.IsBanned = true;
            user.BanExpiration = DateTime.Now;
            if (days <= 30) {
                user.BanExpiration = user.BanExpiration.AddDays(days);
            }
            else if (days > 30) {
                user.BanExpiration = user.BanExpiration.AddYears(10);
            }
            user.BanReason = memberDto.BanReason;

            var result = await _userManager.UpdateSecurityStampAsync(user);

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("unban-user/{username}")]
        public async Task<ActionResult> UnbanUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find meme");

            user.IsBanned = false;
            user.BanExpiration = DateTime.Now;
            user.BanReason = null;

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("contact-form-messages")]
        public async Task<ActionResult> GetContactFormMessages()
        {
            var messages = await _unitOfWork.UserRepository.GetContactFormMessages();

            return Ok(messages);
        }
    }
}