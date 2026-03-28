using System;

namespace IntelligentLMS.Shared.Events;

public record CourseEnrolledEvent(Guid EnrollmentId, Guid UserId, Guid CourseId, DateTime Timestamp);
