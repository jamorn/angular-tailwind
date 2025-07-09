import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MachineOEEData, OEEDataDTO, MachineOrder } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private machineDataSubject = new BehaviorSubject<MachineOEEData | null>(null);
  machineData$ = this.machineDataSubject.asObservable();

  updateMachineData(data: MachineOEEData | null): void {
    //console.log('[ChartService] updateMachineData called');
   // console.log('[ChartService] Data received:', data ? 'Has Data' : 'No Data');
    
    if (!data) {
     // console.warn('[ChartService] Received null data');
      return;
    }
    this.machineDataSubject.next(data);
  }

  // แก้ไข createChartsFromMachineData
  createChartsFromMachineData(machineData: MachineOEEData): { [key: string]: Highcharts.Options } {
    if (!machineData) {
      console.warn('No machine data provided');
      return {};
    }

    try {
      const chartOptions: { [key: string]: Highcharts.Options } = {};
      const orderedKeys = this.getOrderedMachineKeys(machineData);

      orderedKeys.forEach(key => {
        const data = machineData[key as keyof MachineOEEData];
        if (data?.length > 0) {
          const machineName = key.replace('oeeDataList', '');
          chartOptions[key] = this.createOEEChartOptions(machineName, data);
        }
      });

      console.log('Created chart options for machines:', Object.keys(chartOptions));
      return chartOptions;
    } catch (error) {
      console.error('Error creating charts:', error);
      return {};
    }
  }

  // เพิ่มเมธอดช่วยจัดเรียงลำดับเครื่องจักร
  private getOrderedMachineKeys(machineData: MachineOEEData): string[] {
    return Object.keys(machineData).sort((a, b) => {
      const machineA = a.replace('oeeDataList', '');
      const machineB = b.replace('oeeDataList', '');
      
      const orderA = MachineOrder[machineA as keyof typeof MachineOrder] || 999;
      const orderB = MachineOrder[machineB as keyof typeof MachineOrder] || 999;
      
      return orderA - orderB;
    });
  }

  createOEEChartOptions(machine: string, data: OEEDataDTO[]): Highcharts.Options {
    const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');

    return {
      chart: {
        backgroundColor: '#121212',
        style: { fontFamily: 'inherit' },
        height: 500,
        spacing: [20, 20, 20, 20], // เพิ่ม padding ภายใน chart
        reflow: true // ให้ chart ปรับขนาดอัตโนมัติ
      },
      colors: [baseColor],
      title: {
        text: data[0]?.titleOEE || `OEE Machine ${machine}`,
        style: {
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '16px',
          fontFamily: 'inherit'
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'inherit'
          },
          rotation: -45,
          align: 'right'
        },
        gridLineColor: 'rgba(255, 255, 255, 0.1)',
        lineColor: 'rgba(255, 255, 255, 0.2)'
      },
      yAxis: {
        title: {
          text: '%',
          style: { color: '#FFFFFF', fontFamily: 'inherit' }
        },
        labels: {
          style: {
            color: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'inherit'
          }
        },
        gridLineColor: 'rgba(255, 255, 255, 0.1)'
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        style: { color: '#121212' },
        borderWidth: 0,
        borderRadius: 8,
        shadow: true,
        animation: true,
        useHTML: true,
        shared: true,
        formatter: function() {
          if (!this.points) return '';

          const dateString = (this.points[0] as any).point.options.dateString || '';
          const remarks = (this.points[0] as any).point.options.remarks || [];

          // Create HTML string directly instead of calling service methods
          let html = `
            <div style="
              min-width: 350px;
              max-width: 450px;
              padding: 12px;
              line-height: 1.5;
              font-size: 12px;
            ">
              <div style="text-align: center; margin-bottom: 12px;">
                <div style="font-size: 14px; font-weight: 600; color: #121212; margin-bottom: 4px;">
                  ${dateString}
                </div>
                <div style="font-size: 13px; font-weight: 500; color: #666666;">
                  OEE Performance
                </div>
              </div>
              <div style="height: 1px; background: #E0E0E0; margin: 8px 0;"></div>
          `;

          // Add performance metrics
          this.points.forEach(point => {
            const value = point.y ?? 0;
            html += `
              <div style="display: flex; justify-content: flex-start; align-items: center; margin: 4px 0; gap: 8px;">
                <span style="display: flex; align-items: center; min-width: 120px;">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${point.color}; margin-right: 6px;"></span>
                  <span style="color: #444444">${point.series.name}:</span>
                </span>
                <span style="font-weight: 600; color: #121212">${value.toFixed(2)}%</span>
              </div>
            `;
          });

          // Add remarks if available
          if (remarks?.length > 0) {
            html += `
              <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E0E0E0;">
                <div style="font-weight: 600; color: #121212; margin-bottom: 8px;">Remarks:</div>
                <div style="padding-left: 8px;">
                  ${remarks.map((remark: string) => `
                    <div style="display: flex; align-items: center; color: #666666; margin-bottom: 6px; font-size: 11px; line-height: 1.4;">
                      <span style="display: inline-block; min-width: 16px; color: #444444; font-size: 14px;">•</span>
                      <span style="flex: 1; word-wrap: break-word;">${remark}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }

          html += '</div>';
          return html;
        }
      },
      series: this.createOEESeries(data),
      credits: { enabled: false }
    };
  }

  createGiveawayChartOptions(machine: string, data: OEEDataDTO[]): Highcharts.Options {
    return {
      chart: {
        backgroundColor: '#121212',
        style: { fontFamily: 'inherit' },
        height: 500
      },
      title: {
        text: data[0]?.titleGiveAway || `Giveaway Machine ${machine}`,
        style: {
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '16px'
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: { color: '#FFFFFF' },
          rotation: -45
        }
      },
      yAxis: [{
        title: {
          text: 'Giveaway',
          style: { color: '#FFFFFF' }
        },
        labels: { style: { color: '#FFFFFF' } }
      }],
      series: this.createGiveawaySeries(data),
      tooltip: {
        shared: true,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        style: { color: '#121212' },
        borderWidth: 0,
        borderRadius: 8,
        shadow: true
      }
    };
  }

  private createTooltipHeader(dateString: string): string {
    return `
      <div style="
        min-width: 350px;
        max-width: 450px;
        padding: 12px;
        line-height: 1.5;
        font-size: 12px;
      ">
        <div style="text-align: center; margin-bottom: 12px;">
          <div style="font-size: 14px; font-weight: 600; color: #121212; margin-bottom: 4px;">
            ${dateString}
          </div>
          <div style="font-size: 13px; font-weight: 500; color: #666666;">
            OEE Performance
          </div>
        </div>
        <div style="height: 1px; background: #E0E0E0; margin: 8px 0;"></div>
    `;
  }

  private createPerformanceMetrics(points: any[]): string {
    return points.map(point => {
      const value = point.y ?? 0;
      return `
        <div style="display: flex; justify-content: flex-start; align-items: center; margin: 4px 0; gap: 8px;">
          <span style="display: flex; align-items: center; min-width: 120px;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${point.color}; margin-right: 6px;"></span>
            <span style="color: #444444">${point.series.name}:</span>
          </span>
          <span style="font-weight: 600; color: #121212">${value.toFixed(2)}%</span>
        </div>
      `;
    }).join('');
  }

  private createRemarksSection(remarks: string[]): string {
    return `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E0E0E0;">
        <div style="font-weight: 600; color: #121212; margin-bottom: 8px;">Remarks:</div>
        <div style="padding-left: 8px;">
          ${remarks.map(remark => `
            <div style="display: flex; align-items: center; color: #666666; margin-bottom: 6px; font-size: 11px; line-height: 1.4;">
              <span style="display: inline-block; min-width: 16px; color: #444444; font-size: 14px;">•</span>
              <span style="flex: 1; word-wrap: break-word;">${remark}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private createOEESeries(data: OEEDataDTO[]): Highcharts.SeriesOptionsType[] {
    return [
      {
        name: 'OEE',
        type: 'column',
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.oee,
          color: d.color,
          remarks: d.remarks,
          dateString: d.dateString
        }))
      },
      {
        name: 'Availability',
        type: 'line',
        color: '#4572A7',
        lineWidth: 2,
        marker: { symbol: 'circle', radius: 4 },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.availability
        }))
      },
      {
        name: 'Performance',
        type: 'line',
        color: '#AA4643',
        lineWidth: 2,
        marker: { symbol: 'diamond', radius: 4 },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.performance
        }))
      },
      {
        name: 'Quality',
        type: 'line',
        color: '#89A54E',
        lineWidth: 2,
        marker: { symbol: 'triangle', radius: 4 },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.quality
        }))
      },
      {
        name: 'Target',
        type: 'line',
        color: '#FF0000',
        dashStyle: 'Solid',
        lineWidth: 2,
        marker: { enabled: false },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.oeeTarget
        }))
      }
    ];
  }

  private createGiveawaySeries(data: OEEDataDTO[]): Highcharts.SeriesOptionsType[] {
    return [
      {
        name: 'Giveaway',
        type: 'spline',
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.giveaway
        }))
      },
      {
        name: 'Min',
        type: 'line',
        dashStyle: 'Dash',
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.giveAwayMin
        }))
      },
      {
        name: 'Max',
        type: 'line',
        dashStyle: 'Dash',
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.giveAwayMax
        }))
      }
    ];
  }
}
