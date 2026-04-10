namespace IntelligentLMS.Shared.Events;

public record LessonUpdatedEvent(
    Guid LessonId,
    Guid CourseId,
    string Content,
    DateTime Timestamp
);
