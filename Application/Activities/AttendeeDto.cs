namespace Application.Activities
{
    public class AttendeeDto
    {
        public string username { get; set; }
        public string displayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}