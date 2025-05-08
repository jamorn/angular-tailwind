# ปัญหาในการเรียง chart ไม่ตรงกับความต้องการ ก่อนการแก้ไขคือ นำ HDPEA ขึ้นก่อนซึ่งจะไม่ตรงกับความต้องการ
เนื่องจากการเรียงลำดับของ oeeDataList ใน JSON มีการเรียงตามตัวอักษรแบบ alphabetical order โดยอัตโนมัติ:

oeeDataListHDPEA (H มาก่อน)
oeeDataListPP12A (P ตามหลัง)
oeeDataListPP12C
oeeDataListPP3A
oeeDataListPP3B
oeeDataListPPCA
oeeDataListPPCB
oeeDataListPPEC
oeeDataListPPED

# การแก้ปัญหา 
1 สร้าง enum หรือ constant เพื่อกำหนดลำดับ
2 เขียนฟังก์ชันเรียงลำดับใหม่
3 ใช้กับข้อมูลก่อนแสดงผล
วิธีนี้จะทำให้สามารถควบคุมลำดับการแสดงผลได้ตามที่ต้องการ แทนที่จะใช้การเรียงตามตัวอักษรแบบอัตโนมัติ
นี่คือ enum ที่ถูกสร้างขึ้น src/dashboard/models/oee.model

enum MachineOrder {
PP12A = 1,
PP12C = 2,
PP3A = 3,
PP3B = 4,
PPCA = 5,
PPCB = 6,
PPEC = 7,
PPED = 8,
HDPEA = 9
}