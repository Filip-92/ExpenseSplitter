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
        Task<IEnumerable<ToDoListTasks>> GetToDoListTasks(string username, string isDone);
        Task<IEnumerable<ToDoListTasks>> GetDailyToDoListTasks(string username);
        Task<IEnumerable<ToDoListTasks>> GetToDoListGroupTasks(int groupId, string isDone);
        Task<IEnumerable<ToDoListTasks>> GetDailyGroupToDoListTasks(int groupId);
        Task<IEnumerable<ToDoListTasks>> GetTasksFilter(string username, DateTime from, DateTime to);
        Task<IEnumerable<ToDoListTasks>> GetGroupTasksFilter(DateTime from, DateTime to, int groupId);
        Task<ToDoListTasks> GetTaskById(int id);
        Task<IEnumerable<TasksGroup>> GetGroups(string username);
        Task<TasksGroup> GetGroupById(int id);
        Task<IEnumerable<ToDoListContributors>> GetGroupContributors(int id);
        Task<IEnumerable<ToDoListContributors>> GetContributors();
        Task<ToDoListContributors> GetContributorById(int id);
        Task<IEnumerable<CommentDto>> GetComments(int taskId);
        Task<IEnumerable<CommentDto>> GetUserComments(string username);
    }
}