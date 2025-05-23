import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '@environments/environment';
import { MachineOEEData } from '@models/oee/oee.model';
import mockData from '@mock-data/response_1748006778314.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/Dashboards`;
  private oeeDataSubject = new BehaviorSubject<MachineOEEData | null>(null);
  public oeeData$ = this.oeeDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Method สำหรับโหลดข้อมูล OEE - จะถูกเรียกครั้งเดียวตอน init
  loadOEEDaily(): void {
    // เลือกใช้ mock data หรือ real API ตาม environment
    const data$ = environment.production || !environment.useMockData
      ? this.http.get<MachineOEEData>(`${this.apiUrl}/GetOEEDaily`)
      : of(mockData as MachineOEEData);

    data$.subscribe({
      next: (data) => this.oeeDataSubject.next(data),
      error: (error) => {
        console.error('Error loading OEE data:', error);
        this.oeeDataSubject.error(error);
      }
    });
  }

  // Method สำหรับดึงข้อมูลเฉพาะเครื่องจักร
  getOEEByMachine(machineName: string): Observable<MachineOEEData> {
    if (!environment.production) {
      // ถ้าเป็น development ใช้ mock data
      return of(mockData as MachineOEEData);
    }
    // ถ้าเป็น production ใช้ real API
    return this.http.get<MachineOEEData>(`${this.apiUrl}/GetOEEByMachine/${machineName}`);
  }
}