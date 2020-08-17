using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : AppController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await MediatR.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await MediatR.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Activity>> Create(Create.Command command)
        {
            return await MediatR.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await MediatR.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await MediatR.Send(new Delete.Command { Id = id });
        }
    }
}