import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
/* import { ChartService } from '../../services/chart.service';
import { DashboardService } from '../../services/dashboard.service';
import { MachineOEEData, MachineOrder } from '@core/models/oee/oee.model'; */
import { ChartService } from '@dashboard-services/chart.service';
import { DashboardService } from '@dashboard-services/dashboard.service';
import { MachineOEEData, MachineOrder } from '@models/oee/oee.model';
import { Subscription, throwError, TimeoutError } from 'rxjs';
import { finalize, timeout, catchError, tap } from 'rxjs/operators';
//import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-oee',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  providers: [
    //DashboardService
  ],  // Remove ChartService from providers since it's provided in root
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.css']
})
export class OeeComponent implements OnInit, OnDestroy {
  // Highcharts properties
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: { [key: string]: Highcharts.Options } = {};

  // UI state properties
  loading = false;
  error: string | null = null;

  // Change from private to public
  public dataProcessed = false;

  // Initialize orderedMachines as empty array to avoid optional chaining
  public orderedMachines: string[] = [];

  private chartInstances: Highcharts.Chart[] = [];
  private subscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[OeeComponent] Initializing');
    this.loading = true;

    this.subscription = this.chartService.machineData$
      .pipe(
        tap(data => {
          console.log('[OeeComponent] Received data:', data ? 'Has Data' : 'No Data');
          if (data) {
            this.loading = false;  // Set loading to false when data received
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data && !this.dataProcessed) {
            console.log('[OeeComponent] Processing data');
            this.processOEEData(data);
            this.dataProcessed = true;
            this.error = null;
            this.cdr.detectChanges();  // Force change detection after data processing
          }
        },
        error: (err) => {
          console.error('[OeeComponent] Error:', err);
          this.error = 'Failed to load chart data';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    if (!this.dataProcessed) {
      console.log('[OeeComponent] Triggering initial data load');
      this.dashboardService.loadOEEDaily();
    }
  }

  ngOnDestroy(): void {
    this.dataProcessed = false;  // รีเซ็ตเมื่อ component ถูกทำลาย
    // Safely unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Safely destroy charts
    if (this.chartInstances) {
      this.chartInstances.forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
          try {
            chart.destroy();
          } catch (error) {
            console.warn('Error destroying chart:', error);
          }
        }
      });
    }
    
    // Clear instances array
    this.chartInstances = [];
  }

  private loadOEEData(): void {
    this.loading = true;
    
    // เพิ่ม timeout protection
    const timeoutMs = 10000; // 10 seconds
    
    this.subscription = this.dashboardService.oeeData$
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data: MachineOEEData | null) => {
          if (data) {
            this.processOEEData(data);
            this.chartService.updateMachineData(data);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error loading OEE data:', err);
          this.error = 'Failed to load OEE data';
        }
      });

    // Trigger data load
    this.dashboardService.loadOEEDaily();
  }

  debugInfo() {
    return {
      loading: this.loading,
      hasChartOptions: !!this.chartOptions,
      chartOptionsKeys: Object.keys(this.chartOptions || {}),
      orderedMachinesLength: this.orderedMachines?.length || 0
    };
  }

  processOEEData(data: MachineOEEData): void {
    console.log('========== START PROCESSING OEE DATA ==========');
    try {
      this.orderedMachines = Object.entries(MachineOrder)
        .filter(([key]) => isNaN(Number(key)))
        .sort(([, a], [, b]) => (a as number) - (b as number))
        .map(([name]) => `oeeDataList${name}`);

      console.log('Ordered machine keys:', this.orderedMachines);
      
      this.chartOptions = {};
      this.orderedMachines.forEach(machine => {
        console.log('Processing machine:', machine.replace('oeeDataList', ''));
        const typedMachine = machine as keyof MachineOEEData;
        if (data[typedMachine] && data[typedMachine].length > 0) {
          // แก้จากนี้
          // this.chartOptions[machine] = this.createOEEChartOptions(...)
          // เป็น
          this.chartOptions[machine] = this.chartService.createOEEChartOptions(
            machine.replace('oeeDataList', ''),
            data[typedMachine]
          );
        }
      });

      console.log('Final chartOptions keys:', Object.keys(this.chartOptions));
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error in processOEEData:', error);
      this.loading = false;
      this.error = 'Error processing chart data';
      this.cdr.detectChanges();
    }
    console.log('========== END PROCESSING OEE DATA ==========');
  }

  onChartInstance(chart: Highcharts.Chart): void {
    if (chart) {
      this.chartInstances.push(chart);
    }
  }
}

