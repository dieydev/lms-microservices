namespace IntelligentLMS.Shared.Data;

/// <summary>
/// Shared constants for data seeding across all microservices.
/// Ensures consistent GUIDs for users and entities across services.
/// </summary>
public static class SeedConstants
{
    // User IDs - Must be consistent across Auth, User, and Progress services
    public static readonly Guid AdminUserId = new("11111111-1111-1111-1111-111111111111");
    public static readonly Guid InstructorUserId = new("22222222-2222-2222-2222-222222222222");
    public static readonly Guid StudentUserId = new("33333333-3333-3333-3333-333333333333");
    public static readonly Guid Student2UserId = new("44444444-4444-4444-4444-444444444444");
    public static readonly Guid Student3UserId = new("55555555-5555-5555-5555-555555555555");

    // Course IDs - Must be consistent across Course and Progress services
    public static readonly Guid Course1Id = new("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    public static readonly Guid Course2Id = new("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
    public static readonly Guid Course3Id = new("cccccccc-cccc-cccc-cccc-cccccccccccc");
    public static readonly Guid Course4Id = new("dddddddd-dddd-dddd-dddd-dddddddddddd");
    public static readonly Guid Course5Id = new("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee");

    // Lesson IDs for Course 1 (.NET Microservices) - 6 lessons
    public static readonly Guid Course1Lesson1Id = new("a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1");
    public static readonly Guid Course1Lesson2Id = new("a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2");
    public static readonly Guid Course1Lesson3Id = new("a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3");
    public static readonly Guid Course1Lesson4Id = new("a4a4a4a4-a4a4-a4a4-a4a4-a4a4a4a4a4a4");
    public static readonly Guid Course1Lesson5Id = new("a5a5a5a5-a5a5-a5a5-a5a5-a5a5a5a5a5a5");
    public static readonly Guid Course1Lesson6Id = new("a6a6a6a6-a6a6-a6a6-a6a6-a6a6a6a6a6a6");

    // Lesson IDs for Course 2 (React) - 5 lessons
    public static readonly Guid Course2Lesson1Id = new("b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1");
    public static readonly Guid Course2Lesson2Id = new("b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2");
    public static readonly Guid Course2Lesson3Id = new("b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3");
    public static readonly Guid Course2Lesson4Id = new("b4b4b4b4-b4b4-b4b4-b4b4-b4b4b4b4b4b4");
    public static readonly Guid Course2Lesson5Id = new("b5b5b5b5-b5b5-b5b5-b5b5-b5b5b5b5b5b5");

    // Lesson IDs for Course 3 (Kafka) - 4 lessons
    public static readonly Guid Course3Lesson1Id = new("c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1");
    public static readonly Guid Course3Lesson2Id = new("c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2");
    public static readonly Guid Course3Lesson3Id = new("c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3");
    public static readonly Guid Course3Lesson4Id = new("c4c4c4c4-c4c4-c4c4-c4c4-c4c4c4c4c4c4");

    // Lesson IDs for Course 4 (PostgreSQL) - 5 lessons
    public static readonly Guid Course4Lesson1Id = new("d1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1");
    public static readonly Guid Course4Lesson2Id = new("d2d2d2d2-d2d2-d2d2-d2d2-d2d2d2d2d2d2");
    public static readonly Guid Course4Lesson3Id = new("d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3");
    public static readonly Guid Course4Lesson4Id = new("d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4");
    public static readonly Guid Course4Lesson5Id = new("d5d5d5d5-d5d5-d5d5-d5d5-d5d5d5d5d5d5");

    // Lesson IDs for Course 5 (JWT) - 4 lessons
    public static readonly Guid Course5Lesson1Id = new("e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1");
    public static readonly Guid Course5Lesson2Id = new("e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2");
    public static readonly Guid Course5Lesson3Id = new("e3e3e3e3-e3e3-e3e3-e3e3-e3e3e3e3e3e3");
    public static readonly Guid Course5Lesson4Id = new("e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4");

    // Default password hash (BCrypt for "Password123!")
    public const string DefaultPasswordHash = "$2a$11$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJotJIF0zJ7K8P5SzdK";

    // User Emails
    public const string AdminEmail = "admin@lms.local";
    public const string InstructorEmail = "instructor@lms.local";
    public const string StudentEmail = "student@lms.local";
    public const string Student2Email = "student2@lms.local";
    public const string Student3Email = "student3@lms.local";
}

