ขั้นตอนการทำงานของ GetCurrentUser()
1. การเรียกจาก Frontend

// Angular Service เรียก API
getCurrentUser(): Observable<any> {
    return this.http.get<any>('/api/auth/getCurrentUser', { 
        withCredentials: true  // สำคัญ! ต้องส่ง Windows credentials
    });
}
2. การทำงานใน Backend (ตามลำดับ)
2.1 รับ Request และตรวจสอบ Windows Identity:
var windowsIdentity = User.Identity?.Name;
if (string.IsNullOrEmpty(windowsIdentity))
{
    return Unauthorized(new { message = "Not authenticated" });
}
-ดึงข้อมูล user จาก Windows Authentication
- ถ้าไม่มี จะ return 401 Unauthorized
2.2 ค้นหาข้อมูลพนักงานในฐานข้อมูล:
var employee = await _context.Employees
    .FirstOrDefaultAsync(e => e.Email == windowsIdentity);

if (employee == null)
{
    return Unauthorized(new { message = "Employee not found" });
}
- ใช้ email จาก Windows Identity ค้นหาในตาราง Employees
- ถ้าไม่พบข้อมูล จะ return 401 Unauthorized
3. ส่งข้อมูลกลับ Frontend:
return Ok(new
{
    success = true,
    user = new
    {
        empId = employee.EmpId,
        name = employee.FullNameEN,
        email = employee.Email,
        roles = employee.Role.ToLower() == "admin" 
            ? new[] { "admin", "user" } 
            : new[] { "user" }
    }
});
- ส่งข้อมูลพนักงานและสิทธิ์การใช้งาน
- HTTP Status 200 OK

4. การจัดการ Error:
catch (Exception ex)
{
    _logger.LogError(ex, "Error getting current user");
    return StatusCode(500, new { message = ex.Message });
}
- บันทึก error ลง log
- ส่ง HTTP Status 500 ถ้าเกิดข้อผิดพลาด
# การนำไปใช้ใน Frontend
/ Component ที่ต้องการตรวจสอบ user
ngOnInit() {
    this.authService.getCurrentUser().subscribe({
        next: (response) => {
            if (response.success) {
                // เก็บข้อมูล user
                this.currentUser = response.user;
                // ตรวจสอบสิทธิ์
                this.isAdmin = response.user.roles.includes('admin');
            }
        },
        error: (error) => {
            // จัดการกรณี error
            console.error('Authentication failed:', error);
        }
    });
}

หมายเหตุ:
- ต้องเปิดใช้ Windows Authentication ใน IIS/IIS Express
- Frontend ต้องอยู่ใน Domain เดียวกันหรือตั้งค่า CORS ให้ถูกต้อง
- การส่ง withCredentials: true จาก Frontend เป็นสิ่งสำคัญ