using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime? Date { get; set; }

            public string City { get; set; }

            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not Found"
                    });


                if (!string.IsNullOrWhiteSpace(request.Title)) activity.Title = request.Title;
                if (!string.IsNullOrWhiteSpace(request.Description)) activity.Description = request.Description;
                if (!string.IsNullOrWhiteSpace(request.Category)) activity.Category = request.Category;
                if (request.Date.HasValue) activity.Date = request.Date.Value;
                if (!string.IsNullOrWhiteSpace(request.City)) activity.City = request.City;
                if (!string.IsNullOrWhiteSpace(request.Venue)) activity.Venue = request.Venue;

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem editing activity");
            }
        }
    }
}