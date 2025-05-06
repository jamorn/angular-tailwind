import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MachineOEEData, OEEDataDTO } from '@models/oee.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private machineDataSubject = new BehaviorSubject<MachineOEEData | null>(null);
  machineData$ = this.machineDataSubject.asObservable();

  updateMachineData(data: MachineOEEData) {
    this.machineDataSubject.next(data);
  }

  // เปลี่ยน type parameter จาก any[] เป็น OEEDataDTO[]
  createOEEChartOptions(machine: string, data: OEEDataDTO[]): Highcharts.Options {
    const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');

    return {
      chart: {
        backgroundColor: '#121212',
        style: { fontFamily: 'inherit' },
        height: 500
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
        lineColor: 'rgba(255, 255, 255, 0.2)',
        crosshair: {
          color: baseColor,
          width: 1,
          dashStyle: 'Dash'
        }
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        style: {
          color: '#FFFFFF',
          fontFamily: 'inherit'
        },
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        shared: true,
        formatter: function() {
          if (!this.points) return '';

          const hasRemarks = this.points.some(p => 
            p.series.name === 'OEE' && ((p as any).options?.remarks?.length > 0)
          );

          let html = `<div style="
            min-width: ${hasRemarks ? '400px' : '200px'};
            max-width: ${hasRemarks ? '600px' : '300px'};
          ">`;

          // Date header
          const dateString = (this.points[0] as any).options?.dateString || '';
          html += `<div style="padding: 4px 0"><b>Date: ${dateString}</b></div>`;

          // Values
          this.points.forEach(point => {
            html += `
              <div style="display: grid; grid-template-columns: 140px auto; align-items: center; margin: 4px 0">
                <div style="display: flex; align-items: center;">
                  <span style="color: ${point.color}; margin-right: 5px">●</span>
                  <span>${point.series.name}:</span>
                </div>
                <div style="text-align: left; padding-left: 10px">
                  <b>${point.y?.toFixed(1)}%</b>
                </div>
              </div>`;

            // Add remarks if present
            if (point.series.name === 'OEE') {
              const remarks = (point as any).options?.remarks || [];
              if (remarks.length > 0) {
                html += `
                  <div style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px">
                    <b>Remarks:</b>
                    <div style="margin-top: 8px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px">
                      ${remarks.map((r: string) => `
                        <div style="color: #CCCCCC; margin: 4px 0; line-height: 1.4; font-size: 12px">
                          • ${r}
                        </div>
                      `).join('')}
                    </div>
                  </div>`;
              }
            }
          });

          html += '</div>';
          return html;
        }
      },
      series: [
        {
          name: 'OEE',
          type: 'column',
          data: data.map(d => ({
            x: new Date(d.dateString).getTime(),
            y: d.oee,
            color: d.color,// ใช้สีจาก data โดยตรง
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
      ],
      credits: { enabled: false }
    };
  }

  // เพิ่ม method สำหรับ process data จาก MachineOEEData
  createChartsFromMachineData(machineData: MachineOEEData): { [key: string]: Highcharts.Options } {
    const chartOptions: { [key: string]: Highcharts.Options } = {};
    
    Object.entries(machineData).forEach(([key, data]) => {
      if (data && data.length > 0) {
        const machineName = key.replace('oeeDataList', '');
        chartOptions[key] = this.createOEEChartOptions(machineName, data);
      }
    });

    return chartOptions;
  }

  // Change method name from createGiveAwayChartOptions to createGiveawayChartOptions
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
      series: [
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
      ],
      tooltip: {
        shared: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        style: { color: '#FFFFFF' }
      }
    };
  }
}
