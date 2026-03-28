using IntelligentLMS.Progress.Entities;
using Microsoft.EntityFrameworkCore;
using IntelligentLMS.Shared.Data;

namespace IntelligentLMS.Progress.Data;

/// <summary>
/// Database initializer for Progress Service.
/// Seeds enrollments and lesson progress for development.
/// Note: Assumes Course Service has been seeded first with matching lesson IDs.
/// </summary>
public static class DbInitializer
{
    /// <summary>
    /// Seeds the database with initial data.
    /// Idempotent - safe to call multiple times.
    /// </summary>
    public static async Task SeedAsync(ProgressDbContext context)
    {
        await SeedEnrollmentsAsync(context);
        await SeedLessonProgressAsync(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedEnrollmentsAsync(ProgressDbContext context)
    {
        if (await context.Enrollments.AnyAsync())
        {
            return; // Already seeded
        }

        var enrollments = new List<Enrollment>
        {
            // Student 1 enrollments
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                CourseId = SeedConstants.Course1Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-15),
                Status = "Active"
            },
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                CourseId = SeedConstants.Course2Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-10),
                Status = "Active"
            },
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                CourseId = SeedConstants.Course5Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-5),
                Status = "Active"
            },
            // Student 2 enrollments
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                CourseId = SeedConstants.Course2Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-12),
                Status = "Active"
            },
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                CourseId = SeedConstants.Course3Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-8),
                Status = "Active"
            },
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                CourseId = SeedConstants.Course4Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-3),
                Status = "Active"
            },
            // Student 3 enrollments
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student3UserId,
                CourseId = SeedConstants.Course1Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-7),
                Status = "Active"
            },
            new Enrollment
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student3UserId,
                CourseId = SeedConstants.Course4Id,
                EnrolledAt = DateTime.UtcNow.AddDays(-4),
                Status = "Active"
            }
        };

        await context.Enrollments.AddRangeAsync(enrollments);
    }

    private static async Task SeedLessonProgressAsync(ProgressDbContext context)
    {
        if (await context.LessonProgresses.AnyAsync())
        {
            return; // Already seeded
        }

        var lessonProgresses = new List<LessonProgress>();

        // Student 1 progress in Course 1 (.NET Microservices) - 75% complete (4 of 6 lessons)
        lessonProgresses.AddRange(new[]
        {
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course1Lesson1Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-15),
                QuizScore = 92.5
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course1Lesson2Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-14),
                QuizScore = 88.0
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course1Lesson3Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-13),
                QuizScore = 95.0
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course1Lesson4Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-12),
                QuizScore = 90.5
            }
        });

        // Student 1 progress in Course 2 (React) - 40% complete (2 of 5 lessons)
        lessonProgresses.AddRange(new[]
        {
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course2Lesson1Id,
                CourseId = SeedConstants.Course2Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-10),
                QuizScore = 87.5
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.StudentUserId,
                LessonId = SeedConstants.Course2Lesson2Id,
                CourseId = SeedConstants.Course2Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-9),
                QuizScore = 91.0
            }
        });

        // Student 2 progress in Course 2 (React) - 60% complete (3 of 5 lessons)
        lessonProgresses.AddRange(new[]
        {
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                LessonId = SeedConstants.Course2Lesson1Id,
                CourseId = SeedConstants.Course2Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-12),
                QuizScore = 94.0
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                LessonId = SeedConstants.Course2Lesson2Id,
                CourseId = SeedConstants.Course2Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-11),
                QuizScore = 96.5
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student2UserId,
                LessonId = SeedConstants.Course2Lesson3Id,
                CourseId = SeedConstants.Course2Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-10),
                QuizScore = 93.0
            }
        });

        // Student 2 progress in Course 3 (Kafka) - 25% complete (1 of 4 lessons)
        lessonProgresses.Add(new LessonProgress
        {
            Id = Guid.NewGuid(),
            UserId = SeedConstants.Student2UserId,
            LessonId = SeedConstants.Course3Lesson1Id,
            CourseId = SeedConstants.Course3Id,
            IsCompleted = true,
            CompletedAt = DateTime.UtcNow.AddDays(-8),
            QuizScore = 97.5
        });

        // Student 3 progress in Course 1 (.NET Microservices) - 50% complete (3 of 6 lessons)
        lessonProgresses.AddRange(new[]
        {
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student3UserId,
                LessonId = SeedConstants.Course1Lesson1Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-7),
                QuizScore = 89.0
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student3UserId,
                LessonId = SeedConstants.Course1Lesson2Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-6),
                QuizScore = 86.5
            },
            new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = SeedConstants.Student3UserId,
                LessonId = SeedConstants.Course1Lesson3Id,
                CourseId = SeedConstants.Course1Id,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow.AddDays(-5),
                QuizScore = 91.0
            }
        });

        await context.LessonProgresses.AddRangeAsync(lessonProgresses);
    }
}

