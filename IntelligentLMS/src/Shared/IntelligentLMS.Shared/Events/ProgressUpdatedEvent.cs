using System;

namespace IntelligentLMS.Shared.Events;

public record ProgressUpdatedEvent(Guid ProgressId, Guid UserId, Guid CourseId, double PercentComplete, DateTime Timestamp);
