ขั้นตอนการทำงานของ Backend  method GetCurrentUser()

# json resualt 2 รูปแบบคือ 
1. เป็น user ทั่วไป 
{"success":false,"message":"Not authenticated","windowsUser":{"name":"Pimpajee Ponlapatsanan","domain":"IRPC","username":"pimpajee.p"}}

2. ผู้ใช้งานระบบ
{
  "success": true,
  "user": {
    "empId": "804",
    "name": "Mr. Thakol Limpakdee",
    "email": "thakol.li@irpc.co.th",
    "role": "super user",
    "unit": "PL"
  },
  "windowsUser": {
    "name": "Thakol Limpakdee",
    "domain": "IRPC",
    "username": "thakol_l"
  }
}




