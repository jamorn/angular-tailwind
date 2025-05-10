import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
/* import { ChartService } from '../../services/chart.service';
import { DashboardService } from '../../services/dashboard.service';
import { MachineOEEData, MachineOrder } from '@core/models/oee/oee.model'; */
import { ChartService } from '@dashboard-services/chart.service';
import { DashboardService } from '@dashboard-services/dashboard.service';
import { MachineOEEData, MachineOrder } from '@models/oee/oee.model';

@Component({
  selector: 'app-oee',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  providers: [
    DashboardService
  ],  // Remove ChartService from providers since it's provided in root
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.css']
})
export class OeeComponent implements OnInit {
  // Highcharts properties
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: { [key: string]: Highcharts.Options } = {};

  // UI state properties
  loading = false;
  error: string | null = null;

  // Add ordered machines property
  orderedMachines: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.loadOEEData();
  }

  private loadOEEData(): void {
    console.log('========== START LOADING OEE DATA ==========');
    this.loading = true;
    this.error = null;

    this.dashboardService.getOEEDaily().subscribe({
      next: (data: MachineOEEData) => {
        console.log('Received OEE Data:', Object.keys(data));
        this.processOEEData(data);
        this.chartService.updateMachineData(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading OEE data:', err);
        this.error = 'Failed to load OEE data';
        this.loading = false;
      }
    });
  }

  private processOEEData(data: MachineOEEData): void {
    console.log('========== START PROCESSING OEE DATA ==========');
    
    // Create ordered machine keys based on MachineOrder enum
    this.orderedMachines = Object.entries(MachineOrder)
      .filter(([key]) => isNaN(Number(key)))
      .sort(([, a], [, b]) => (a as number) - (b as number))
      .map(([name]) => `oeeDataList${name}`);
    
    console.log('Ordered machine keys:', this.orderedMachines);

    // Process data in enum order
    this.orderedMachines.forEach(machine => {
      const typedMachine = machine as keyof MachineOEEData;
      if (data[typedMachine] && data[typedMachine].length > 0) {
        const machineName = machine.replace('oeeDataList', '');
        console.log(`Processing machine: ${machineName}`);
        this.chartOptions[machine] = this.chartService.createOEEChartOptions(
          machineName,
          data[typedMachine]
        );
      }
    });
    
    console.log('Final chartOptions keys:', Object.keys(this.chartOptions));
    console.log('========== END PROCESSING OEE DATA ==========');
  }
}

