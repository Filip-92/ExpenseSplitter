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
    public class ToDoListController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IMemeService _memeService;
        private readonly IUnitOfWork _unitOfWork;
        public ToDoListController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService, IMemeService memeService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _memeService = memeService;
            _mapper = mapper;
        }

        [HttpPost("add-to-do-list-task")]
        public async Task<ActionResult<ToDoListTasks>> AddToDoListTask(ToDoListTasksDto toDoListTasksDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var toDoListTask = new ToDoListTasks
            {
                Id = toDoListTasksDto.Id,
                Name = toDoListTasksDto.Name,
                TaskDate = toDoListTasksDto.TaskDate,
                Username = user.UserName
            };

            user.ToDoListTasks.Add(toDoListTask);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ToDoListTasksDto>(toDoListTask));
            }

            return BadRequest("Problem z dodawaniem zadania");
        }

        [HttpPost("remove-task/{taskId}")]
        public async Task<ActionResult> RemoveTask(int taskId)
        {
            var task = await _unitOfWork.ToDoListRepository.GetTaskById(taskId);

            if (task == null) return NotFound("Could not find task");

            _unitOfWork.UserRepository.RemoveTask(task);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-task/{taskId}")]
        public async Task<ActionResult> UpdateTask(UpdateTaskDto updateTaskDto, int taskId)
        {
            var task = await _unitOfWork.ToDoListRepository.GetTaskById(taskId);

            // _unitOfWork.ToDoListRepository.Update(comment);
            task.Name = updateTaskDto.Name;
            task.TaskDate = updateTaskDto.TaskDate;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować zadania");
        }

        [HttpPut("close-task/{taskId}")]
        public async Task<ActionResult> CloseTask(int taskId)
        {
            var task = await _unitOfWork.ToDoListRepository.GetTaskById(taskId);

            task.IsDone = !task.IsDone;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się zakończyć zadania");
        }

        [HttpPost("add-group")]
        public async Task<ActionResult<TasksGroup>> AddGroup(TasksGroupDto tasksGroupDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var group = new TasksGroup
            {
                Id = tasksGroupDto.Id,
                Name = tasksGroupDto.Name,
                Username = user.UserName
            };

            user.TasksGroups.Add(group);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<TasksGroupDto>(group));
            }

            return BadRequest("Problem z dodawaniem grupy");
        }

        [HttpPost("remove-group/{groupId}")]
        public async Task<ActionResult> RemoveGroup(int groupId)
        {
            var group = await _unitOfWork.ToDoListRepository.GetGroupById(groupId);

            if (group == null) return NotFound("Could not find group");

            _unitOfWork.UserRepository.RemoveGroup(group);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-group/{groupId}")]
        public async Task<ActionResult> UpdateGroup(UpdateGroupDto updateGroupDto, int groupId)
        {
            var group = await _unitOfWork.ToDoListRepository.GetGroupById(groupId);

            // _unitOfWork.ToDoListRepository.Update(comment);
            group.Name = updateGroupDto.Name;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować grupy");
        }

        [HttpPost("add-contributor")]
        public async Task<ActionResult<ToDoListContributors>> AddContributor(ToDoListContributorsDto toDoListContributorsDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var contributors = await _unitOfWork.ToDoListRepository.GetGroupContributors(toDoListContributorsDto.GroupId);

            foreach(var cont in contributors)
            {
                if (cont.Username == toDoListContributorsDto.Username.ToLower())
                {
                    return BadRequest("Istnieje już użytkownik o takiej nazwie w danej grupie");
                }
            }

            var contributor = new ToDoListContributors
            {
                Id = toDoListContributorsDto.Id,
                Username = toDoListContributorsDto.Username.ToLower(),
                Email = toDoListContributorsDto.Email,
                GroupId = toDoListContributorsDto.GroupId
            };

            user.ToDoListContributors.Add(contributor);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ToDoListContributorsDto>(contributor));
            }

            return BadRequest("Problem z dodawaniem użytkownika");
        }

        [HttpPost("remove-contributor/{contributorId}")]
        public async Task<ActionResult> RemoveContributor(int contributorId)
        {
            var contributor = await _unitOfWork.ToDoListRepository.GetContributorById(contributorId);

            if (contributor == null) return NotFound("Could not find contributor");

            _unitOfWork.UserRepository.RemoveContributor(contributor);

            await _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("update-contributor/{contributorId}")]
        public async Task<ActionResult> UpdateContributor(UpdateToDoListContributorDto updateContributorDto, int contributorId)
        {
            var contributor = await _unitOfWork.ToDoListRepository.GetContributorById(contributorId);

            var contributors = await _unitOfWork.ToDoListRepository.GetGroupContributors(updateContributorDto.GroupId);

            foreach(var cont in contributors)
            {
                if (cont.Username == updateContributorDto.Username.ToLower())
                {
                    return BadRequest("Istnieje już użytkownik o takiej nazwie w danej grupie");
                }
            }

            // _unitOfWork.ToDoListRepository.Update(comment);
            contributor.Username = updateContributorDto.Username;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Nie udało się edytować wariata");
        }

    }
}