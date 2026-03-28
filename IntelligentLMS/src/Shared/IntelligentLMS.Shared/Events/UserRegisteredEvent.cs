using System;

namespace IntelligentLMS.Shared.Events;

public record UserRegisteredEvent(Guid UserId, string Email, string FullName, DateTime Timestamp);
