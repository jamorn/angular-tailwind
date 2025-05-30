import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartService } from '@dashboard-services/chart.service';
import { MachineOEEData, MachineOrder } from '@models/oee/oee.model';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DashboardService } from '@dashboard-services/dashboard.service'; // Add this import

@Component({
  selector: 'app-giveaway',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.css']
})
export class GiveawayComponent implements OnInit, OnDestroy {
  // Highcharts properties
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: { [key: string]: Highcharts.Options } = {};

  // UI state properties
  loading = false;
  error: string | null = null;
  public dataProcessed = false;
  public orderedMachines: string[] = [];

  private subscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[GiveawayComponent] Initializing');
    this.loading = true;

    this.subscription = this.chartService.machineData$
      .pipe(
        tap(data => {
          console.log('[GiveawayComponent] Received data:', data ? 'Has Data' : 'No Data');
          if (data) {
            this.loading = false;
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data && !this.dataProcessed) {
            console.log('[GiveawayComponent] Processing data');
            this.processGiveawayData(data);
            this.dataProcessed = true;
            this.error = null;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('[GiveawayComponent] Error:', err);
          this.error = 'Failed to load chart data';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    if (!this.dataProcessed) {
      console.log('[GiveawayComponent] Triggering initial data load');
      this.dashboardService.loadOEEDaily();
    }
  }

  private processGiveawayData(data: MachineOEEData): void {
    console.log('========== START PROCESSING GIVEAWAY DATA ==========');
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
          this.chartOptions[machine] = this.chartService.createGiveawayChartOptions(
            machine.replace('oeeDataList', ''),
            data[typedMachine]
          );
        }
      });

      console.log('Final chartOptions keys:', Object.keys(this.chartOptions));
      this.loading = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error in processGiveawayData:', error);
      this.loading = false;
      this.error = 'Error processing chart data';
      this.cdr.detectChanges();
    }
    console.log('========== END PROCESSING GIVEAWAY DATA ==========');
  }

  ngOnDestroy(): void {
    this.dataProcessed = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
