namespace IntelligentLMS.Course.Application.DTOs;

public class LessonDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public Guid CourseId { get; set; }
    public int Order { get; set; }
}
