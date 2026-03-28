using Microsoft.EntityFrameworkCore;
using IntelligentLMS.Course.Entities;
using CourseEntity = IntelligentLMS.Course.Entities.Course;

namespace IntelligentLMS.Course.Data;

public class CourseDbContext : DbContext
{
    public CourseDbContext(DbContextOptions<CourseDbContext> options) : base(options) { }

    public DbSet<CourseEntity> Courses { get; set; }
    public DbSet<Lesson> Lessons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<CourseEntity>().HasKey(c => c.Id);
        modelBuilder.Entity<Lesson>().HasKey(l => l.Id);
    }
}
