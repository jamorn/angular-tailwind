import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartService } from '@dashboard-services/chart.service';
import { MachineOEEData, MachineOrder } from '@models/oee/oee.model';
import { Subscription } from 'rxjs';

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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: { [key: string]: Highcharts.Options } = {};
  loading = true;
  error: string | null = null;
  private subscription!: Subscription;  // Add ! operator

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.subscription = this.chartService.machineData$.subscribe({
      next: (data) => {
        if (data) {
          try {
            this.processGiveawayData(data);
            this.error = null;
          } catch (err) {
            this.error = 'Error processing chart data';
            console.error('Error processing data:', err);
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load chart data';
        this.loading = false;
        console.error('Subscription error:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private processGiveawayData(data: MachineOEEData): void {
    const machines = Object.keys(data) as (keyof MachineOEEData)[];
    machines.forEach(machine => {
      const machineData = data[machine];
      if (machineData && machineData.length > 0) {
        const machineName = machine.replace('oeeDataList', '');
        this.chartOptions[machine] = this.chartService.createGiveawayChartOptions(
          machineName,
          machineData
        );
      }
    });
  }
}
