using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ToDoListRepository : IToDoListRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ToDoListRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ToDoListTasks> GetTaskById(int id)
        {
            return await _context.ToDoListTasks
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ToDoListTasks>> GetToDoListTasks(string username)
        {
            return await _context.ToDoListTasks
                        .IgnoreQueryFilters()
                        .Where(m => m.Username == username && (m.GroupId == null || m.GroupId == 0))
                        .ToListAsync();
        }

        public async Task<IEnumerable<ToDoListTasks>> GetDailyToDoListTasks(string username)
        {
            DateTime currentTime = DateTime.Now;
            return await _context.ToDoListTasks
                        .IgnoreQueryFilters()
                        .Where(m => m.Username == username && (m.GroupId == null || m.GroupId == 0) && m.TaskDate.Date == currentTime.Date.Date)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ToDoListTasks>> GetDailyGroupToDoListTasks(int groupId)
        {
            DateTime currentTime = DateTime.Now;
            return await _context.ToDoListTasks
                        .IgnoreQueryFilters()
                        .Where(m => m.GroupId == groupId && m.TaskDate.Date == currentTime.Date.Date)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ToDoListTasks>> GetTasksFilter(string username, DateTime from, DateTime to)
        {
            if (from.Date.Date != to.Date.Date)
            {
                return await _context.ToDoListTasks
                    .IgnoreQueryFilters()
                    .Where(m => m.Username == username && (m.GroupId == null || m.GroupId == 0) && m.TaskDate.Date >= from.Date.Date && m.TaskDate.Date <= to.Date.Date)
                    .ToListAsync();
            }
            else
            {
                return await _context.ToDoListTasks
                    .IgnoreQueryFilters()
                    .Where(m => m.Username == username && (m.GroupId == null || m.GroupId == 0) && m.TaskDate.Date == from.Date.Date)
                    .ToListAsync();
            }

        }

        public async Task<IEnumerable<ToDoListTasks>> GetGroupTasksFilter(DateTime from, DateTime to, int groupId)
        {
            if (from.Date.Date != to.Date.Date)
            {
                return await _context.ToDoListTasks
                    .IgnoreQueryFilters()
                    .Where(m => m.GroupId == groupId && m.TaskDate.Date >= from.Date.Date && m.TaskDate.Date <= to.Date.Date)
                    .ToListAsync();
            }
            else
            {
                return await _context.ToDoListTasks
                    .IgnoreQueryFilters()
                    .Where(m => m.GroupId == groupId && m.TaskDate.Date == from.Date.Date)
                    .ToListAsync();
            }

        }

        public async Task<TasksGroup> GetGroupById(int id)
        {
            return await _context.TasksGroups
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }


        public async Task<IEnumerable<TasksGroup>> GetGroups(string username)
        {
            return await _context.TasksGroups
                        .IgnoreQueryFilters()
                        .Where(m => m.Username == username)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ToDoListContributors>> GetGroupContributors(int id)
        {
            return await _context.ToDoListContributors
                        .IgnoreQueryFilters()
                        .Where(m => m.GroupId == id)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ToDoListContributors>> GetContributors()
        {
            return await _context.ToDoListContributors
                        .IgnoreQueryFilters()
                        .ToListAsync();
        }

        public async Task<ToDoListContributors> GetContributorById(int id)
        {
            return await _context.ToDoListContributors
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ToDoListTasks>> GetToDoListGroupTasks(int groupId)
        {
            return await _context.ToDoListTasks
                        .IgnoreQueryFilters()
                        .Where(m => m.GroupId == groupId)
                        .ToListAsync();
        }

        public async Task<IEnumerable<CommentDto>> GetComments(int taskId)
        {
            return await _context.Comments
                        .IgnoreQueryFilters()
                        .Where(m => m.TaskId == taskId)
                        .Select(u => new CommentDto
                        {
                            Id = u.Id,
                            TaskId = u.TaskId,
                            Username = u.Username,
                            Content = u.Content,
                            Uploaded = u.Uploaded,
                        })
                        .ToListAsync();
        }

    }
}