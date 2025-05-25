# การทำงานของ backend API
http://localhost:5112/api/Dashboards/GetRecent

# json respon

{
  "success": true,
  "count": 9,
  "dashboards": [
    {
      "machineId": 1,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 91.93,
      "quality": 100,
      "oee": 91.93,
      "giveaway": 25.113,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 2,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 97.02,
      "quality": 100,
      "oee": 97.02,
      "giveaway": 25.113,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 3,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 92.35,
      "quality": 100,
      "oee": 92.35,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 4,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 93.47,
      "quality": 100,
      "oee": 93.47,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 5,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 92.36,
      "quality": 100,
      "oee": 92.36,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 6,
      "recordDateString": "2025-05-06",
      "availability": 100,
      "performance": 94.44,
      "quality": 100,
      "oee": 94.44,
      "giveaway": 25.116,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 7,
      "recordDateString": "2025-03-24",
      "availability": 100,
      "performance": 91.78,
      "quality": 100,
      "oee": 91.78,
      "giveaway": 25.114,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 8,
      "recordDateString": "2025-03-24",
      "availability": 100,
      "performance": 93.27,
      "quality": 100,
      "oee": 93.27,
      "giveaway": 25.114,
      "remarks": [],
      "responsiblePerson": null
    },
    {
      "machineId": 9,
      "recordDateString": "2025-05-05",
      "availability": 100,
      "performance": 95.25,
      "quality": 100,
      "oee": 95.25,
      "giveaway": 25.115,
      "remarks": [],
      "responsiblePerson": null
    }
  ]
}

# คำแนะนำจาก AI Backend api ในการเรียกใช้ GetRecent() ใน Frontend
1. สร้าง Service ใน Angular:
// dashboard.service.ts
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getRecent(): Observable<any> {
    return this.http.get<any>('/api/Dashboards/GetRecent');
  }
}

2. Component ที่แสดง Table
// dashboard-table.component.ts
export class DashboardTableComponent implements OnInit {
  dashboards: any[] = [];
  
  constructor(
    private dashboardService: DashboardService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboards();
  }

  // เมธอดสำหรับโหลดข้อมูล
  loadDashboards() {
    this.dashboardService.getRecent().subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboards = response.dashboards;
          this.changeDetector.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error loading dashboards:', error);
      }
    });
  }

  // เรียกใช้หลังจากบันทึกหรือแก้ไขข้อมูล
  refreshDashboards() {
    this.loadDashboards();
  }
}

3. การเรียกใช้หลังจาก Create/Update

// dashboard-form.component.ts
export class DashboardFormComponent {
  constructor(
    private dashboardService: DashboardService,
    private tableComponent: DashboardTableComponent
  ) {}

  onSave() {
    this.dashboardService.createDashboard(formData).subscribe({
      next: (response) => {
        if (response.success) {
          // หลังจากบันทึกสำเร็จ ให้ refresh table
          this.tableComponent.refreshDashboards();
        }
      }
    });
  }
}

4. การใช้ Event Service เพื่อ Refresh
// dashboard-event.service.ts
@Injectable({
  providedIn: 'root'
})
export class DashboardEventService {
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }
}

// dashboard-table.component.ts
constructor(
  private dashboardService: DashboardService,
  private eventService: DashboardEventService
) {
  this.eventService.refresh$.subscribe(() => {
    this.loadDashboards();
  });
}

// dashboard-form.component.ts
onSave() {
  this.dashboardService.createDashboard(formData).subscribe({
    next: (response) => {
      if (response.success) {
        this.eventService.triggerRefresh();
      }
    }
  });
}