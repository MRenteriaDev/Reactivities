using System.Linq;
using Application.Activities;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                    .ForMember(d => d.HostUsername, o => o
                    .MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                    .ForMember(d => d.displayName, o => o.MapFrom(s => s.AppUser.displayName))
                    .ForMember(d => d.username, o => o.MapFrom(s => s.AppUser.UserName))
                    .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                    .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
                    .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<ActivityAttendee, UserActivityDto>()
                    .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                    .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                    .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                    .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
                    .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Activity.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));

        }
    }
}