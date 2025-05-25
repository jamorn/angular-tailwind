import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import adminData from '@core/mocks/data/admin.json';

@Injectable({
  providedIn: 'root'
})
export class PlStatusPlantService {
  getAdminData(): Observable<any> {
    return of({
      success: true,
      data: adminData.data
    });
  }
}