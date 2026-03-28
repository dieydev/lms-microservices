using IntelligentLMS.User.Entities;
using Microsoft.EntityFrameworkCore;
using IntelligentLMS.Shared.Data;

namespace IntelligentLMS.User.Data;

/// <summary>
/// Database initializer for User Service.
/// Seeds user profiles matching Auth Service users.
/// </summary>
public static class DbInitializer
{
    /// <summary>
    /// Seeds the database with initial data.
    /// Idempotent - safe to call multiple times.
    /// </summary>
    public static async Task SeedAsync(UserDbContext context)
    {
        await SeedUserProfilesAsync(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedUserProfilesAsync(UserDbContext context)
    {
        if (await context.UserProfiles.AnyAsync())
        {
            return; // Already seeded
        }

        var profiles = new List<UserProfile>
        {
            new UserProfile
            {
                UserId = SeedConstants.AdminUserId,
                FullName = "System Administrator",
                Bio = "System administrator with full access to the LMS platform.",
                AvatarUrl = "https://ui-avatars.com/api/?name=System+Admin&background=dc2626&color=fff&size=200",
                PhoneNumber = "+1-555-0100"
            },
            new UserProfile
            {
                UserId = SeedConstants.InstructorUserId,
                FullName = "Dr. Sarah Johnson",
                Bio = "Experienced software engineering instructor with 15+ years in education. Specializes in .NET, microservices architecture, and cloud computing.",
                AvatarUrl = "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff&size=200",
                PhoneNumber = "+1-555-0101"
            },
            new UserProfile
            {
                UserId = SeedConstants.StudentUserId,
                FullName = "John Doe",
                Bio = "Computer Science student passionate about software development and machine learning.",
                AvatarUrl = "https://ui-avatars.com/api/?name=John+Doe&background=059669&color=fff&size=200",
                PhoneNumber = "+1-555-0102"
            },
            new UserProfile
            {
                UserId = SeedConstants.Student2UserId,
                FullName = "Jane Smith",
                Bio = "Full-stack developer learning advanced backend architectures and distributed systems.",
                AvatarUrl = "https://ui-avatars.com/api/?name=Jane+Smith&background=7c3aed&color=fff&size=200",
                PhoneNumber = "+1-555-0103"
            },
            new UserProfile
            {
                UserId = SeedConstants.Student3UserId,
                FullName = "Michael Chen",
                Bio = "Aspiring software engineer focusing on microservices, Docker, and Kubernetes.",
                AvatarUrl = "https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff&size=200",
                PhoneNumber = "+1-555-0104"
            }
        };

        await context.UserProfiles.AddRangeAsync(profiles);
    }
}

