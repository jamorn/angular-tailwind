import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ChartService } from '@dashboard-services/chart.service';
import { MachineOEEData, MachineOrder } from '@models/oee/oee.model';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DashboardService } from '@dashboard-services/dashboard.service'; // Add this import
import { ThemeService, type ThemeConfig } from '@core/services/theme.service';
import type { ButtonToneType } from '@core/services/theme.service';

@Component({
  selector: 'app-giveaway',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    ButtonComponent  // เพิ่ม import นี้
  ],
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.css']
})
export class GiveawayComponent implements OnInit, OnDestroy, AfterViewInit {
  // Highcharts properties
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: { [key: string]: Highcharts.Options } = {};

  // UI state properties
  loading = false;
  error: string | null = null;
  public dataProcessed = false;
  public orderedMachines: string[] = [];

  private subscription?: Subscription;
  currentTheme: ButtonToneType;

  private themeSubscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService
  ) {
    this.currentTheme = this.themeService.getCurrentTheme().color;
  }

  ngOnInit(): void {
    console.log('[GiveawayComponent] Initializing');
    this.loading = true;

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.theme$.subscribe((theme: ThemeConfig) => {
      console.log('Giveaway receiving theme update:', theme);
      this.currentTheme = theme.color;
      this.cdr.markForCheck(); // Force change detection
    });

    this.subscription = this.chartService.machineData$
      .pipe(
        tap(data => {
          console.log('Raw API data:', data);
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
        console.log('Key:', machine, 'Data:', data[typedMachine]);
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

  // Add scroll method after constructor
  scrollToChart(machine: string): void {
    const element = document.getElementById(machine);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  ngAfterViewInit() {
    console.log('=== Giveaway Charts Dimensions ===');
    
    // ตรวจสอบ charts
    const charts = document.querySelectorAll('highcharts-chart');
    charts.forEach((chart, index) => {
      const chartElement = chart as HTMLElement;
      const parentElement = chartElement.parentElement as HTMLElement;
      
      console.log(`Giveaway Chart ${index + 1}:`, {
        chartWidth: chartElement.offsetWidth,
        chartHeight: chartElement.offsetHeight,
        parentWidth: parentElement?.offsetWidth,
        computedStyle: {
          width: window.getComputedStyle(chartElement).width,
          display: window.getComputedStyle(chartElement).display
        }
      });
    });

    // ตรวจสอบ container
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      console.log('Giveaway Container:', {
        containerWidth: container.offsetWidth,
        computedStyle: {
          width: window.getComputedStyle(container).width,
          maxWidth: window.getComputedStyle(container).maxWidth
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dataProcessed = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
