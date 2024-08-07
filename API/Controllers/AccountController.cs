using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Configuration;
using System.Web;
using EmailService;
using Message = EmailService.Message;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _config;
        private readonly IMemeService _memeService;
        public AccountController(
            UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, 
            ITokenService tokenService, 
            IMapper mapper,
            IConfiguration config,
            IUnitOfWork unitOfWork,
            IEmailSender emailSender,
            IMemeService memeService
            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _config = config;
            _unitOfWork = unitOfWork;
            _emailSender = emailSender;
            _memeService = memeService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Nazwa użytkownika jest zajęta");

            if (await EmailExists(registerDto.Email)) return BadRequest("Istnieje już konto z takim adresem Email");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Niewłaściwy email");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Niewłaściwe hasło");

            if (user.BanExpiration < DateTime.Now.AddHours(8)) user.IsBanned = false;

            string msg = "Konto zostało zbanowane. " + "Termin upływu bana to " + user.BanExpiration.ToString("dd/MM/yyyy") + " Powód: " + user.BanReason;

            if (result.Succeeded && user.IsBanned && DateTime.Now.AddHours(8) < user.BanExpiration) return BadRequest(msg);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                ToggleSounds = user.ToggleSounds,
                Gender = user.Gender
            };
        }

        [HttpPost("change-password/{email}")]
        [Authorize]
        public async Task<ActionResult> ChangeOldPassword(ChangePasswordDto changePasswordDto, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (!result.Succeeded) 
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                    return BadRequest(ModelState);
                }
            }
            return Ok();
        }

        [HttpPost("forgot-password/{email}")]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.Users
                        .IgnoreQueryFilters()
                        .Where(e => e.Email.ToLower() == email.ToLower())
                        .FirstOrDefaultAsync();

            if (user == null) return Unauthorized("Nie ma takiego użytkownika");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var uriBuilder = new UriBuilder(_config["returnPaths:PasswordChange"]);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["token"] = token;
            query["userid"] = user.Id.ToString();
            uriBuilder.Query = query.ToString();
            var changePasswordLink = "<a style='margin-top: 10px' href=\"" + uriBuilder.ToString() + "\">Link do zmiany hasła</a><br />";

            var subject = "Resetowanie hasła";
            var content = "<div style='font-size: 20px'>Aby zresetować swoje hasło, kliknij na poniższy link: </div><div>Jeśli nie jesteś odbiorcą tej wiadomości, zignoruj ją.</div><br />";
            var footer = "<br /><hr style='width: 100%'><br /><div style='font-size: 16px'>Wszystkie prawa zastrzeżone &#169 2022  <span style='font-size: 22px; color: red; padding: 5px; border-radius: 3px; border: 1px solid black;'>Split 'n Share</span></div><br>";

            var message = new Message(new string[] { user.Email }, subject, content + changePasswordLink + footer, null);
            
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByIdAsync(resetPasswordDto.UserId);
            if (user == null)
                return BadRequest("Invalid Request");
            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }
            return Ok();
        }

        [Authorize]
        [HttpPost("remove-account/{username}")]
        public async Task<ActionResult> RemoveAccount(string username)
        {
            // var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            // await RemoveFromCloudinary(username);

            if (user == null) return NotFound("Nie znaleziono użytkownika");

            var result = _userManager.DeleteAsync(user);

            await _unitOfWork.Complete();

            return NoContent();
        }

        [HttpGet("is-banned/{username}")]
        public async Task<ActionResult> CheckIfUserBanned(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var bannedUser = await _unitOfWork.UserRepository.CheckIfBanned(user.Id);

            return Ok(bannedUser.IsBanned);
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }

        [HttpGet("get-user-photo/{username}")]
        public async Task<ActionResult> GetUserPhoto(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var photo = await _unitOfWork.UserRepository.GetUserPhoto(user.Id);

            return Ok(photo);
        }

        [HttpPut("toggle-sound")]
        public async Task<ActionResult> ToggleSound()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            user.ToggleSounds = !user.ToggleSounds;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się wyłączyć dźwięków");
        }
    }
} 