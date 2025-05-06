import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartService } from '@services/chart.service';
import { DashboardService } from '@services/dashboard.service';
import { MachineOEEData } from '@models/oee.model';

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

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.loadOEEData();
  }

  private loadOEEData(): void {
    this.loading = true;
    this.error = null;

    this.dashboardService.getOEEDaily().subscribe({
      next: (data: MachineOEEData) => {
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
    const machines = Object.keys(data) as (keyof MachineOEEData)[];
    
    machines.forEach(machine => {
      const machineData = data[machine];
      if (machineData && machineData.length > 0) {
        const machineName = machine.replace('oeeDataList', '');
        this.chartOptions[machine] = this.chartService.createOEEChartOptions(
          machineName,
          machineData
        );
      }
    });
  }
}

