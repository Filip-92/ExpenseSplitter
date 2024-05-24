using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IToDoListRepository
    {
        Task<IEnumerable<ToDoListTasks>> GetToDoListTasks(string username);
        Task<IEnumerable<ToDoListTasks>> GetDailyToDoListTasks(string username, DateTime currentDate);
        Task<IEnumerable<ToDoListTasks>> GetTasksFilter(string username, DateTime from, DateTime to);
        Task<IEnumerable<ToDoListTasks>> GetGroupTasksFilter(DateTime from, DateTime to, int groupId);
        Task<ToDoListTasks> GetTaskById(int id);
        Task<IEnumerable<TasksGroup>> GetGroups(string username);
        Task<TasksGroup> GetGroupById(int id);
        Task<IEnumerable<ToDoListContributors>> GetGroupContributors(int id);
        Task<ToDoListContributors> GetContributorById(int id);
        Task<IEnumerable<ToDoListTasks>> GetToDoListGroupTasks(int groupId);
        Task<IEnumerable<CommentDto>> GetComments(int taskId);
    }
}