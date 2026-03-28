namespace IntelligentLMS.Course.Services;

public interface IProgressServiceClient
{
    Task<bool> EnrollAsync(Guid userId, Guid courseId);
}
