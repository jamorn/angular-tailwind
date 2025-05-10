import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { MachineOEEData } from '@models/oee/oee.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/Dashboards`;

  constructor(private http: HttpClient) { }

  getOEEDaily(): Observable<MachineOEEData> {
    return this.http.get<MachineOEEData>(`${this.apiUrl}/GetOEEDaily`);
  }

  // เพิ่ม methods อื่นๆ ตามต้องการ
  getOEEByMachine(machineName: string): Observable<MachineOEEData> {
    return this.http.get<MachineOEEData>(`${this.apiUrl}/GetOEEByMachine/${machineName}`);
  }
}