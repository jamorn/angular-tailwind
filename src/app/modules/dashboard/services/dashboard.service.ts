import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';  // Add tap and finalize imports
import { environment } from '@environments/environment';
import { MachineOEEData } from '@models/oee/oee.model';
import mockData from '@mock-data/response_1748006778314.json';
import { ChartService } from './chart.service'; // Import ChartService

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/Dashboards`;
  private oeeDataSubject = new BehaviorSubject<MachineOEEData | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isLoading = false;  // เพิ่มตัวแปรเช็คสถานะการโหลด

  public oeeData$ = this.oeeDataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private chartService: ChartService
  ) {}

  // Method สำหรับโหลดข้อมูล OEE - จะถูกเรียกครั้งเดียวตอน init
  loadOEEDaily(): void {
    if (this.isLoading) {
    //  console.log('[DashboardService] Already loading, skip');
      return;
    }

  //  console.log('[DashboardService] Start loadOEEDaily');
    this.isLoading = true;
    this.loadingSubject.next(true);

    // เลือกใช้ mock data หรือ real API ตาม environment
    const apiUrl = `${this.apiUrl}/GetOEEDaily`;
    if (!environment.useMockData) {
      console.log('[DashboardService] Calling API:', apiUrl);
    }
    const data$ = environment.useMockData
      ? of(mockData as MachineOEEData).pipe(delay(300))
      : this.http.get<MachineOEEData>(apiUrl, { withCredentials: true });

    data$.pipe(
      tap(data => 
        console.log('[DashboardService] Received data:'
          , data)),
      finalize(() => {
        this.isLoading = false;
        this.loadingSubject.next(false);
        console.log('[DashboardService] Loading completed');
      })
    ).subscribe({
      next: (data) => {
      //  console.log('[DashboardService] Processing data');
        this.oeeDataSubject.next(data);
        this.chartService.updateMachineData(data);
      },
      error: (error) => {
      //  console.error('[DashboardService] Error loading data:', error);
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
    return this.http.get<MachineOEEData>(`${this.apiUrl}/GetOEEByMachine/${machineName}`, { withCredentials: true });
  }

  // เพิ่มเมธอดสำหรับ clear cache
  clearCache(): void {
    this.oeeDataSubject.next(null);
  }
}