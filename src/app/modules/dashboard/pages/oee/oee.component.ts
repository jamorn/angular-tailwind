import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
// import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-oee',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    // HttpClientModule
  ],
  template: `
    <div class="container">
      <div class="chart-container">
        <highcharts-chart
          [Highcharts]="Highcharts"
          [options]="chartOptionsPP12A"
          class="chart">
        </highcharts-chart>
      </div>
      <div class="chart-container">
        <highcharts-chart
          [Highcharts]="Highcharts"
          [options]="chartOptionsPP12C"
          class="chart">
        </highcharts-chart>
      </div>
    </div>
  `,
  styleUrls: ['./oee.component.css']
})
export class OeeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsPP12A: Highcharts.Options;
  chartOptionsPP12C: Highcharts.Options;
  // private dashboardService: DashboardService

  // Mock Data
  mockData = {
    oeeDataListPP12A: [
      {
        "item": 1,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 90.98,
        "quality": 100.00,
        "oee": 90.98,
        "giveaway": 25.113,
        "remarks": [],
        "dateString": "2025-03-03",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 2,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 93.41,
        "quality": 100.00,
        "oee": 93.41,
        "giveaway": 25.113,
        "remarks": [],
        "dateString": "2025-03-04",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 3,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-05",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 4,
        "machineName": "PP12/A",
        "availability": 55.96,
        "performance": 92.62,
        "quality": 100.00,
        "oee": 51.83,
        "giveaway": 25.117,
        "remarks": [
          "8.05-12:30 เครื่องจักร Alarm bottom welding unit บ่อยมากตั้งแต่เริ่ม Start แก้ใขทำการถอดชุด Bottom Seal ออกมาเปลี่ยน Teflon ใหม่และทำความสะอาดทุกซอกทุกมุมแต่ก็ยังไม่หาย",
          "ทำการ Carlibate ใหม่แล้วก็ยังไม่หาย ไฟสถานะขึ้นเป็น 0 เมื่อชุด Bottom ทำงานBag ไปปรับไป",
          "รอกะบ่ายมาแก้ใขต่อ wo 10875187  MI Check & Repair Bottom seal Line A Temp swing 14.30 - 16.30  MI เปลื่ยน Sealing Bar ใหม่ทั้งชุด"
        ],
        "dateString": "2025-03-06",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 5,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-07",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 6,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-08",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 7,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 91.00,
        "quality": 100.00,
        "oee": 91.00,
        "giveaway": 25.115,
        "remarks": [],
        "dateString": "2025-03-09",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 8,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 92.00,
        "quality": 100.00,
        "oee": 92.00,
        "giveaway": 25.116,
        "remarks": [],
        "dateString": "2025-03-10",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 9,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 93.00,
        "quality": 100.00,
        "oee": 93.00,
        "giveaway": 25.117,
        "remarks": [],
        "dateString": "2025-03-11",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 10,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 94.00,
        "quality": 100.00,
        "oee": 94.00,
        "giveaway": 25.118,
        "remarks": [],
        "dateString": "2025-03-12",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      }
    ],
    oeeDataListPP12C: [
      {
        "item": 1,
                "machineName": "PP12/A",
        "availability": 55.96,
        "performance": 92.62,
        "quality": 100.00,
        "oee": 51.83,
        "giveaway": 25.117,
        "remarks": [
          "8.05-12:30 เครื่องจักร Alarm bottom welding unit บ่อยมากตั้งแต่เริ่ม Start แก้ใขทำการถอดชุด Bottom Seal ออกมาเปลี่ยน Teflon ใหม่และทำความสะอาดทุกซอกทุกมุมแต่ก็ยังไม่หาย",
          "ทำการ Carlibate ใหม่แล้วก็ยังไม่หาย ไฟสถานะขึ้นเป็น 0 เมื่อชุด Bottom ทำงานBag ไปปรับไป",
          "รอกะบ่ายมาแก้ใขต่อ wo 10875187  MI Check & Repair Bottom seal Line A Temp swing 14.30 - 16.30  MI เปลื่ยน Sealing Bar ใหม่ทั้งชุด"
        ],
        "dateString": "2025-03-03",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 2,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 93.41,
        "quality": 100.00,
        "oee": 93.41,
        "giveaway": 25.113,
        "remarks": [],
        "dateString": "2025-03-04",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 3,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-05",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 4,
        "machineName": "PP12/A",
        "availability": 55.96,
        "performance": 92.62,
        "quality": 100.00,
        "oee": 51.83,
        "giveaway": 25.117,
        "remarks": [
          "8.05-12:30 เครื่องจักร Alarm bottom welding unit บ่อยมากตั้งแต่เริ่ม Start แก้ใขทำการถอดชุด Bottom Seal ออกมาเปลี่ยน Teflon ใหม่และทำความสะอาดทุกซอกทุกมุมแต่ก็ยังไม่หาย",
          "ทำการ Carlibate ใหม่แล้วก็ยังไม่หาย ไฟสถานะขึ้นเป็น 0 เมื่อชุด Bottom ทำงานBag ไปปรับไป",
          "รอกะบ่ายมาแก้ใขต่อ wo 10875187  MI Check & Repair Bottom seal Line A Temp swing 14.30 - 16.30  MI เปลื่ยน Sealing Bar ใหม่ทั้งชุด"
        ],
        "dateString": "2025-03-06",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "มีการผลิต"
      },
      {
        "item": 5,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-07",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 6,
        "machineName": "PP12/A",
        "availability": 0.00,
        "performance": 0.00,
        "quality": 0.00,
        "oee": 0.00,
        "giveaway": 25.110,
        "remarks": ["เครื่องจักรหยุดทำงาน"],
        "dateString": "2025-03-08",
        "color": "#ff0000",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 7,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 91.00,
        "quality": 100.00,
        "oee": 91.00,
        "giveaway": 25.115,
        "remarks": [],
        "dateString": "2025-03-09",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 8,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 92.00,
        "quality": 100.00,
        "oee": 92.00,
        "giveaway": 25.116,
        "remarks": [],
        "dateString": "2025-03-10",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 9,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 93.00,
        "quality": 100.00,
        "oee": 93.00,
        "giveaway": 25.117,
        "remarks": [],
        "dateString": "2025-03-11",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      },
      {
        "item": 10,
        "machineName": "PP12/A",
        "availability": 100.00,
        "performance": 94.00,
        "quality": 100.00,
        "oee": 94.00,
        "giveaway": 25.118,
        "remarks": [],
        "dateString": "2025-03-12",
        "color": "#059918",
        "oeeTarget": 85.0,
        "giveAwayMin": 25.100,
        "giveAwayMax": 25.115,
        "titleOEE": "OEE Machine PP12/A",
        "titleGiveAway": "giveaway Machine PP12/A",
        "hasProduction": true,
        "productionStatusMessage": "ไม่มีการผลิต"
      }
    ]


  };

  constructor() {
    this.chartOptionsPP12A = this.createChartOptions('PP12A', this.mockData.oeeDataListPP12A);
    this.chartOptionsPP12C = this.createChartOptions('PP12C', this.mockData.oeeDataListPP12C);
  }

  ngOnInit(): void {
    /*
    this.dashboardService.getOEEDaily().subscribe({
      next: (data) => {
        // API handling code
      },
      error: (err) => {
        console.error('Error loading OEE data:', err);
      }
    });
    */
  }

  private createChartOptions(machine: string, data: any[]): Highcharts.Options {
    const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');

    return {
      chart: {
        backgroundColor: '#121212',
        style: {
          fontFamily: 'inherit'  // กำหนด font ผ่าน style object
        },
        height: 500
      },
      colors: [baseColor],
      title: {
        text: data[0].titleOEE,
        style: {
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '16px',
          fontFamily: 'inherit'  // กำหนด font สำหรับ title
        }
      },
      xAxis: {
        type: 'datetime',  // เปลี่ยนเป็น datetime
        labels: {
          style: {
            color: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'inherit'  // กำหนด font สำหรับ axis labels
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
          style: {
            color: '#FFFFFF',
            fontFamily: 'inherit'
          }
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
      plotOptions: {
        series: {
          states: {
            hover: {
              brightness: 0.1
            }
          }
        },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, `${baseColor}66`], // 40% opacity
              [1, `${baseColor}11`]  // 7% opacity
            ]
          }
        }
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
        formatter: function () {
          if (!this.points) return '';

          const dateString = (this.points[0] as any).options?.dateString || '';
          const hasRemarks = this.points.some(p =>
            p.series.name === 'OEE' && ((p as any).options?.remarks?.length > 0)
          );

          // ปรับความกว้างตามกรณีมี/ไม่มี remarks
          let html = `<div style="
            min-width: ${hasRemarks ? '400px' : '200px'};
            max-width: ${hasRemarks ? '600px' : '300px'};
          ">`;

          this.points.forEach(p => {
            const value = (p.y !== undefined && p.y !== null) ? p.y.toFixed(1) : '0.0';

            html += `
              <div style="display:grid;grid-template-columns:140px auto;align-items:center;margin:4px 0">
                <div style="display:flex;align-items:center;">
                  <span style="color:${p.color};margin-right:5px">●</span>
                  <span>${p.series.name}:</span>
                </div>
                <div style="text-align:left;padding-left:10px">
                  <b>${value}%</b>
                </div>
              </div>`;

            if (p.series.name === 'OEE') {
              const remarks = (p as any).options?.remarks || [];
              if (remarks.length > 0) {
                html += `
                  <div style="
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    min-width: 400px;
                    max-width: 600px;
                  ">
                    <div style="font-weight:bold;margin-bottom:5px;color:#FFFFFF">Remarks:</div>
                    ${remarks.map((remark: string) => `
                      <div style="
                        color:#CCCCCC;
                        margin:4px 0;
                        padding:4px 0;
                        line-height:1.4;
                        word-wrap: break-word;
                        white-space: pre-wrap;
                        width: 100%;
                        font-size: 12px;
                      ">• ${remark}</div>
                    `).join('')}
                  </div>`;
              }
            }
          });

          html += `</div>`;
          return html;
        }
      },
      series: [{
        name: 'OEE',
        type: 'column',
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),  // แปลง dateString เป็น timestamp
          y: d.oee,
          color: d.color,
          remarks: d.remarks,
          dateString: d.dateString  // เก็บ dateString ไว้ใช้ใน tooltip
        }))
      }, {
        name: 'Availability',
        type: 'line',
        color: '#4572A7',
        lineWidth: 2,
        marker: {
          symbol: 'circle',
          radius: 4
        },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.availability
        }))
      }, {
        name: 'Performance',
        type: 'line',
        color: '#AA4643',
        lineWidth: 2,
        marker: {
          symbol: 'diamond',
          radius: 4
        },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.performance
        }))
      }, {
        name: 'Quality',
        type: 'line',
        color: '#89A54E',
        lineWidth: 2,
        marker: {
          symbol: 'triangle',
          radius: 4
        },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.quality
        }))
      }, {
        name: 'Target',
        type: 'line',
        color: '#FF0000',
        dashStyle: 'Solid',
        lineWidth: 2,
        marker: {
          enabled: false
        },
        data: data.map(d => ({
          x: new Date(d.dateString).getTime(),
          y: d.oeeTarget
        }))
      }],
      credits: {
        enabled: false
      }
    };
  }
}
