using IntelligentLMS.Course.Data;
using IntelligentLMS.Course.Entities;
using IntelligentLMS.Course.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace IntelligentLMS.Course.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly CourseDbContext _context;
    private readonly VnpayService _vnpay;
    private readonly IProgressServiceClient _progressClient;
    private readonly IConfiguration _config;

    public PaymentsController(
        CourseDbContext context,
        VnpayService vnpay,
        IProgressServiceClient progressClient,
        IConfiguration config)
    {
        _context = context;
        _vnpay = vnpay;
        _progressClient = progressClient;
        _config = config;
    }

    /// <summary>
    /// Tạo URL thanh toán VNPAY cho khóa học có phí
    /// </summary>
    [HttpPost("vnpay/create")]
    [Authorize]
    public async Task<IActionResult> CreateVnpayUrl([FromBody] CreateVnpayRequest request)
    {
        try
        {
            if (request == null)
                return BadRequest(new { message = "Request body không hợp lệ" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
            var userId = userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var uid) ? uid : request.UserId ?? Guid.Empty;

            if (userId == Guid.Empty)
                return Unauthorized(new { message = "Không xác định được người dùng" });

            var courseId = request.CourseId;
            if (courseId == Guid.Empty)
                return BadRequest(new { message = "CourseId không hợp lệ" });

            var course = await _context.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == null)
                return NotFound(new { message = "Không tìm thấy khóa học" });

            if (course.Price <= 0)
                return BadRequest(new { message = "Khóa học này miễn phí, vui lòng ghi danh trực tiếp" });

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
            var rawRef = $"{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}";
            var txnRef = rawRef.Length > 50 ? rawRef[..50] : rawRef;    // Ensure txnRef is not longer than 50 characters
            var orderInfo = $"COURSE={courseId}|USER={userId}";
            var paymentUrl = _vnpay.CreatePaymentUrl((long)course.Price, orderInfo, txnRef, ip);

            return Ok(new { paymentUrl, courseId = course.Id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message, detail = ex.ToString() });
        }
    }

    /// <summary>
    /// Callback sau khi thanh toán VNPAY (redirect URL)
    /// </summary>
    [HttpGet("vnpay/return")]
    [AllowAnonymous]
    public async Task<IActionResult> VnpayReturn()
    {
        var frontendBase = _config["FrontendBaseUrl"] ?? "http://localhost:5173";
        var failUrl = $"{frontendBase}/payment/result";
        var successUrl = failUrl;

        if (!_vnpay.VerifyReturnUrl(Request.Query))
            return Redirect($"{failUrl}?status=fail&message=Invalid+hash");

        var responseCode = Request.Query["vnp_ResponseCode"].FirstOrDefault();
        if (responseCode != "00")
        {
            var msg = Request.Query["vnp_Message"].FirstOrDefault() ?? "Thanh toán thất bại";
            return Redirect($"{failUrl}?status=fail&message={Uri.EscapeDataString(msg)}");
        }

        var orderInfo = Request.Query["vnp_OrderInfo"].FirstOrDefault() ?? "";
        if (string.IsNullOrEmpty(orderInfo) || !orderInfo.Contains("|"))
        {
            return Redirect($"{failUrl}?status=fail&message=Invalid+order+info");
        }

        var parts = orderInfo.Split('|');
        Guid courseId = Guid.Empty;
        Guid userId = Guid.Empty;
        foreach (var p in parts)
        {
            if (p.StartsWith("COURSE=") && Guid.TryParse(p.Substring(7), out var cid)) courseId = cid;
            if (p.StartsWith("USER=") && Guid.TryParse(p.Substring(5), out var uid)) userId = uid;
        }

        if (courseId == Guid.Empty || userId == Guid.Empty)
        {
            return Redirect($"{failUrl}?status=fail&message=Cannot+parse+order");
        }

        _ = await _progressClient.EnrollAsync(userId, courseId);

        return Redirect($"{successUrl}?status=success&courseId={courseId}");
    }
}

public class CreateVnpayRequest
{
    public Guid? UserId { get; set; }
    public Guid CourseId { get; set; }
}
