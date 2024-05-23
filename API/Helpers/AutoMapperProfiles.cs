using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.MemeUrl, opt => opt.MapFrom(src => 
                    src.Memes.FirstOrDefault(x => x.IsApproved).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoUpdateDto, AppUser>();
            CreateMap<Memes, MemeDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Expenses, ExpensesDto>();
            CreateMap<Contributors, ContributorsDto>();
            CreateMap<Spendings, SpendingsDto>();
            CreateMap<CategoryPhoto, CategoryPhotoDto>();
            CreateMap<ToDoListTasks, ToDoListTasksDto>();
            CreateMap<TasksGroup, TasksGroupDto>();
            CreateMap<ToDoListContributors, ToDoListContributorsDto>();
            CreateMap<Comment, CommentDto>();
            CreateMap<ContactForm, ContactFormDto>();
            CreateMap<Notifications, NotificationDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<MessageDto, Message>();
            CreateMap<MessageUpdateDto, AppUser>();
        }
    }
} 