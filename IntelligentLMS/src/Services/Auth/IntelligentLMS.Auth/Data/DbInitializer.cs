using IntelligentLMS.Auth.Entities;
using IntelligentLMS.Shared.DTOs.Common;
using IntelligentLMS.Shared.Data;
using Microsoft.EntityFrameworkCore;

namespace IntelligentLMS.Auth.Data;

/// <summary>
/// Database initializer for Auth Service.
/// Seeds default users for development and testing.
/// </summary>
public static class DbInitializer
{
    /// <summary>
    /// Seeds the database with initial data.
    /// Idempotent - safe to call multiple times.
    /// </summary>
    public static async Task SeedAsync(AuthDbContext context)
    {
        await SeedUsersAsync(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(AuthDbContext context)
    {
        if (await context.Users.AnyAsync())
        {
            return; // Already seeded
        }

        var users = new List<User>
        {
            new User
            {
                Id = SeedConstants.AdminUserId,
                Email = SeedConstants.AdminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FullName = "System Administrator",
                Role = Roles.Admin,
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                IsLocked = false
            },
            new User
            {
                Id = SeedConstants.InstructorUserId,
                Email = SeedConstants.InstructorEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FullName = "Dr. Sarah Johnson",
                Role = Roles.Teacher,
                CreatedAt = DateTime.UtcNow.AddDays(-25),
                IsLocked = false
            },
            new User
            {
                Id = SeedConstants.StudentUserId,
                Email = SeedConstants.StudentEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FullName = "John Doe",
                Role = Roles.Student,
                CreatedAt = DateTime.UtcNow.AddDays(-20),
                IsLocked = false
            },
            new User
            {
                Id = SeedConstants.Student2UserId,
                Email = SeedConstants.Student2Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FullName = "Jane Smith",
                Role = Roles.Student,
                CreatedAt = DateTime.UtcNow.AddDays(-15),
                IsLocked = false
            },
            new User
            {
                Id = SeedConstants.Student3UserId,
                Email = SeedConstants.Student3Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FullName = "Michael Chen",
                Role = Roles.Student,
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                IsLocked = false
            }
        };

        await context.Users.AddRangeAsync(users);
    }
}

