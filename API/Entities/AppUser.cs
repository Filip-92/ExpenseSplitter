using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        [Key]
        [Column("email")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override string Email { get; set; }
        public AppUser() 
        {
            Messages = new List<ContactForm>();
            Notifications = new List<Notifications>();
            Categories = new List<Category>();
            Memes = new List<Memes>();
            Expenses = new List<Expenses>();
            Contributors = new List<Contributors>();
            Spendings = new List<Spendings>();
            CategoryPhotos = new List<CategoryPhoto>();
            ToDoListTasks = new List<ToDoListTasks>();
            TasksGroups = new List<TasksGroup>();
            ToDoListContributors = new List<ToDoListContributors>();
        }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now.AddHours(8);
        public DateTime LastActive { get; set; } = DateTime.Now.AddHours(8);
        public string Gender { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Memes> Memes { get; set; }
        public ICollection<ContactForm> Messages { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Expenses> Expenses { get; set; }
        public ICollection<Contributors> Contributors { get; set; }
        public ICollection<Spendings> Spendings { get; set;}
        public ICollection<CategoryPhoto> CategoryPhotos { get; set; }
        public ICollection<ToDoListTasks> ToDoListTasks { get; set;}
        public ICollection<TasksGroup> TasksGroups { get; set;}
        public ICollection<ToDoListContributors> ToDoListContributors { get; set; }
        public ICollection<Notifications> Notifications { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public bool IsBanned { get; set; }
        public DateTime BanExpiration { get; set; }
        public string BanReason { get; set; }

    }
} 