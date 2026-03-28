using System.Net.Http.Json;
using System.Text.Json;
using IntelligentLMS.Shared.DTOs.Progress;

namespace IntelligentLMS.Course.Services;

public class ProgressServiceClient : IProgressServiceClient
{
    private readonly HttpClient _httpClient;

    public ProgressServiceClient(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        var baseUrl = configuration["ProgressServiceUrl"] ?? "http://localhost:5004";
        _httpClient.BaseAddress = new Uri(baseUrl);
    }

    public async Task<bool> EnrollAsync(Guid userId, Guid courseId)
    {
        try
        {
            var dto = new EnrollmentDto { UserId = userId, CourseId = courseId };
            var response = await _httpClient.PostAsJsonAsync("/api/progress/enroll", dto, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            if (response.IsSuccessStatusCode) return true;
            if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                var body = await response.Content.ReadAsStringAsync();
                if (body.Contains("Already enrolled", StringComparison.OrdinalIgnoreCase))
                    return true; // Đã enroll rồi, coi như thành công
            }
            return false;
        }
        catch
        {
            return false;
        }
    }
}
