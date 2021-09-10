using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Create
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidation : AbstractValidator<Command>
        {
            public CommandValidation()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to Create Activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}