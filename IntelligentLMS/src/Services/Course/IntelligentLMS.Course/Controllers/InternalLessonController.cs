using IntelligentLMS.Course.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IntelligentLMS.Course.Controllers;

[ApiController]
[Route("internal/lessons")]
public class InternalLessonController : ControllerBase
{
    private readonly CourseDbContext _context;
    private readonly IConfiguration _configuration;

    public InternalLessonController(CourseDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    private bool IsAuthorized()
    {
        var expectedApiKey = _configuration["InternalApiKey"];
        if (string.IsNullOrEmpty(expectedApiKey)) return false;

        if (!Request.Headers.TryGetValue("X-Internal-API-Key", out var extractedApiKey))
            return false;

        return expectedApiKey.Equals(extractedApiKey);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSummaryInfo(Guid id)
    {
        if (!IsAuthorized()) return Unauthorized("Invalid API Key");

        var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
        if (lesson == null) return NotFound("Lesson not found");

        return Ok(new
        {
            Summary = lesson.Summary,
            Keywords = lesson.Keywords
        });
    }

    public class UpdateSummaryDto
    {
        public string Summary { get; set; } = string.Empty;
        public List<string> Keywords { get; set; } = new();
    }

    [HttpPut("{id}/summary")]
    public async Task<IActionResult> UpdateSummaryInfo(Guid id, [FromBody] UpdateSummaryDto dto)
    {
        if (!IsAuthorized()) return Unauthorized("Invalid API Key");

        var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
        if (lesson == null) return NotFound("Lesson not found");

        lesson.Summary = dto.Summary;
        lesson.Keywords = dto.Keywords ?? new List<string>();
        lesson.SummaryUpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { Message = "Summary updated successfully." });
    }
}
