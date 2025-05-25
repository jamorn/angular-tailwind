import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { OeeEntryData } from '../models/oee-entry.model';

@Injectable({
  providedIn: 'root'
})
export class OeeEntryService {
  private oeeDataSubject = new BehaviorSubject<OeeEntryData[]>([]);
  public oeeData$ = this.oeeDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.getRecent().subscribe(data => {
      if (data.success) {
        this.oeeDataSubject.next(data.dashboards);
      }
    });
  }

  getRecent(): Observable<any> {
    return environment.production || !environment.useMockData
      ? this.http.get<any>(`${environment.apiUrl}/api/Dashboards/GetRecent`)
      : of({
          success: true,
          count: 9,
          dashboards: [/* mock data here */]
        });
  }

  addEntry(entry: OeeEntryData): Observable<any> {
    // Update local data immediately
    const currentData = this.oeeDataSubject.value;
    this.oeeDataSubject.next([entry, ...currentData]);
    
    // Send to API
    return environment.production || !environment.useMockData
      ? this.http.post(`${environment.apiUrl}/api/Dashboards`, entry)
      : of({ success: true });
  }
}