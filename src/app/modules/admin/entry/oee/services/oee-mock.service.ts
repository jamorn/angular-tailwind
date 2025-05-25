import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OeeEntryResponse } from '../models/oee-entry.model';

@Injectable({
  providedIn: 'root'
})
export class OeeMockService {
  getRecent(): Observable<OeeEntryResponse> {
    const mockData: OeeEntryResponse = {
      success: true,
      count: 9,
      dashboards: [
    {
      "machineId": 1,
      "machineName": "PP12/A",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 91.93,
      "quality": 100,
      "oee": 91.93,
      "giveaway": 25.113,
      "remarks": ["mfg line stopped for 10 minutes due to maintenance"," fg line stopped for 5 minutes due to material shortage"],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 2,
      "machineName": "PP12/C",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 97.02,
      "quality": 100,
      "oee": 97.02,
      "giveaway": 25.113,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 3,
      "machineName": "PP3/A",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 92.35,
      "quality": 100,
      "oee": 92.35,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 4,
      "machineName": "PP3/B",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 93.47,
      "quality": 100,
      "oee": 93.47,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 5,
      "machineName": "PPE/C",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 92.36,
      "quality": 100,
      "oee": 92.36,
      "giveaway": 25.116,
     "remarks": ["mfg line stopped for 10 minutes due to maintenance"," fg line stopped for 5 minutes due to material shortage"," mfg line stopped for 15 minutes due to power outage"],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 6,
      "machineName": "PPE/D",
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 94.44,
      "quality": 100,
      "oee": 94.44,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 7,
      "machineName": "PPC/A",
      "recordDateString": "2025-03-24",
      "availability": 100,
      "performance": 91.78,
      "quality": 100,
      "oee": 91.78,
      "giveaway": 25.114,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 8,
      "machineName": "PPC/B",
      "recordDateString": "2025-03-24",
      "availability": 100,
      "performance": 93.27,
      "quality": 100,
      "oee": 93.27,
      "giveaway": 25.114,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    },
    {
      "machineId": 9,
      "machineName": "HDPE/A",
      "recordDateString": "2025-05-05",
      "availability": 100,
      "performance": 95.25,
      "quality": 100,
      "oee": 95.25,
      "giveaway": 25.115,
      "remarks": [],
      "responsiblePerson": "Mr. Kittithuch Uthaicharanunt"
    }
  ]
    };
    
    return of(mockData);
  }

  // เพิ่ม method สำหรับ submit form
  submitEntry(data: any): Observable<OeeEntryResponse> {
    return of({
      success: true,
      count: 1,
      dashboards: [
        {
          ...data,
          recordDateString: data.recordDateString || new Date().toISOString().split('T')[0],
          remarks: data.remarks || [],
          responsiblePerson: data.responsiblePerson || null
        }
      ]
    });
  }
}