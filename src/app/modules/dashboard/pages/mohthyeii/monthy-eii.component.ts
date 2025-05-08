import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-monthy-eii',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  templateUrl: './monthy-eii.component.html',
  styleUrls: ['./monthy-eii.component.css']  // แก้ไขจาก styleUrl เป็น styleUrls
})
export class MonthyEiiComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartDiv1') chartDiv1!: ElementRef;
  @ViewChild('chartDiv2') chartDiv2!: ElementRef;
  
  chart1: Highcharts.Chart | undefined;
  chart2: Highcharts.Chart | undefined;

  // Add chartOptions1 configuration
  chartOptions1: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#121212',
      style: {
        fontFamily: 'inherit'
      },
      height: 500
    },
    title: {
      text: 'EII Weekly Report',
      style: {
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: [],
      crosshair: true,
      labels: {
        style: {
          color: '#FFFFFF',
          fontSize: '12px'
        }
      },
      gridLineColor: 'rgba(255, 255, 255, 0.1)',
      lineColor: 'rgba(255, 255, 255, 0.2)'
    },
    yAxis: {
      title: {
        text: '%',
        style: { color: '#FFFFFF' }
      },
      labels: {
        style: {
          color: '#FFFFFF',
          fontSize: '12px'
        }
      },
      gridLineColor: 'rgba(255, 255, 255, 0.1)'
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      style: {
        color: '#FFFFFF'
      },
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      shared: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.y:.2f}'
        }
      }
    },
    series: [
      {
        name: 'EII',
        type: 'column',
        data: [],
        color: undefined  // Will be set from data
      },
      {
        name: 'Target',
        type: 'line',
        data: [],
        marker: {
          symbol: 'circle'
        },
        color: '#FF0000'
      }
    ] as Highcharts.SeriesOptionsType[]
  };

  // Add dataProvider1
  dataProvider1 = [
    {
      "category": "AUG24",
      "EII": "65.34",
      "color": "#059918",
      "Target": "69.46"
    },
    {
      "category": "SEP24",
      "EII": "68.28",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "OCT24",
      "EII": "68.58",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "NOV24",
      "EII": "68.29",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "DEC24",
      "EII": "67.88",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "JAN25",
      "EII": "68.94",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "FEB25",
      "EII": "67.93",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "MAR25",
      "EII": "68.82",
      "color": "#059918",
      "Target": "69.46"
    }, {
      "category": "APR25",
      "EII": "67.85",
      "color": "#059918",
      "Target": "69.46"
    }
  ];

  // Add processChartData1 method
  processChartData1() {
    if (this.chartOptions1.xAxis && Array.isArray(this.chartOptions1.series)) {
      (this.chartOptions1.xAxis as any).categories = this.dataProvider1.map(item => item.category);
      
      const eiiData = this.dataProvider1.map(item => ({
        y: parseFloat(item.EII),
        color: item.color
      }));
      
      const targetData = this.dataProvider1.map(item => parseFloat(item.Target));

      if (this.chartOptions1.series[0]) {
        (this.chartOptions1.series[0] as any).data = eiiData;
      }
      if (this.chartOptions1.series[1]) {
        (this.chartOptions1.series[1] as any).data = targetData;
      }

      if (this.chart1) {
        this.chart1.update(this.chartOptions1);
      }
    }
  }

  chartOptions2: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#121212',
      style: {
        fontFamily: 'inherit'
      },
      height: 500
    },
    title: {
      text: 'EII Monitoring Report',
      style: {
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: [],
      crosshair: true,
      labels: {
        style: {
          color: '#FFFFFF',
          fontSize: '12px'
        }
      },
      gridLineColor: 'rgba(255, 255, 255, 0.1)',
      lineColor: 'rgba(255, 255, 255, 0.2)'
    },
    yAxis: {
      title: {
        text: '%',
        style: { color: '#FFFFFF' }
      },
      labels: {
        style: {
          color: '#FFFFFF',
          fontSize: '12px'
        }
      },
      gridLineColor: 'rgba(255, 255, 255, 0.1)'
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',  // เปลี่ยนเป็นพื้นขาวโปร่งแสง
      style: {
        color: '#121212'  // เปลี่ยนสีตัวอักษรเป็นสีเข้ม
      },
      borderWidth: 0,
      borderRadius: 8,  // เพิ่มความโค้งมนของ tooltip
      shadow: true,     // เพิ่มเงา
      animation: true,  // เพิ่มอนิเมชั่น
      useHTML: true,
      shared: true,
      formatter: function() {
        if (!this.points) return '';
    
        // แก้ไขการแสดง category
        const category = this.points[0].key || '';  // ใช้ key แทน this.x
    
        let html = `
          <div style="
            min-width: 150px;
            padding: 8px;
            line-height: 1.5;
            font-size: 12px;
          ">
            <div style="
              font-weight: bold;
              margin-bottom: 8px;
              color: #121212;
            ">${category}</div>  <!-- ใช้ category แทน (this as any).x -->
            <div style="color: #666666; margin-bottom: 8px;">EII แยกตามหน่วยงาน</div>
        `;
    
        this.points.forEach(point => {
          const value = point.y ?? 0; // Add null coalescing operator
          html += `
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 4px 0;
            ">
              <span style="
                display: flex;
                align-items: center;
              ">
                <span style="
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: ${point.color};
                  margin-right: 6px;
                "></span>
                <span style="color: #444444">${point.series.name}:</span>
              </span>
              <span style="
                font-weight: bold;
                color: #121212;
              ">${value.toFixed(2)}%</span>
            </div>
          `;
        });
    
        html += '</div>';
        return html;
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.y:.2f}'
        }
      }
    },
    series: [
      {
        name: 'HDPE',
        type: 'column',
        data: [],
        color: '#2E86C1'  // สีฟ้าเข้ม
      },
      {
        name: 'PP12',
        type: 'column',
        data: [],
        color: '#27AE60'  // สีเขียวสด
      },
      {
        name: 'PP3',
        type: 'column',
        data: [],
        color: '#8E44AD'  // สีม่วง
      },
      {
        name: 'Target',
        type: 'line',
        data: [],
        marker: {
          symbol: 'circle',
          radius: 4
        },
        color: '#E74C3C',  // สีแดงอิฐ
        dashStyle: 'ShortDash',
        lineWidth: 2
      }
    ] as Highcharts.SeriesOptionsType[]
  };
  dataProvider2 = [
    {
      "category": "JAN24",
      "HD": "88.86",
      "PP12": "56.23",
      "PP3": "68.71",
      "Target": "69.46"
    },
    {
      "category": "FEB24",
      "HD": "84.41",
      "PP12": "57.56",
      "PP3": "67.08",
      "Target": "69.46"
    },
    {
      "category": "MAR24",
      "HD": "89.80",
      "PP12": "64.02",
      "PP3": "61.59",
      "Target": "69.46"
    },
    {
      "category": "APR24",
      "HD": "81.08",
      "PP12": "57.59",
      "PP3": "63.69",
      "Target": "69.46"
    },
    {
      "category": "MAY24",
      "HD": "81.50",
      "PP12": "56.53",
      "PP3": "66.29",
      "Target": "69.46"
    },
    {
      "category": "JUN24",
      "HD": "81.51",
      "PP12": "56.19",
      "PP3": "61.87",
      "Target": "69.46"
    },
    {
      "category": "JUL24",
      "HD": "80.48",
      "PP12": "50.96",
      "PP3": "74.95",
      "Target": "69.46"
    },
    {
      "category": "AUG24",
      "HD": "86.46",
      "PP12": "53.35",
      "PP3": "62.65",
      "Target": "69.46"
    },
    {
      "category": "SEP24",
      "HD": "86.28",
      "PP12": "51.72",
      "PP3": "71.44",
      "Target": "69.46"
    },
    {
      "category": "OCT24",
      "HD": "83.70",
      "PP12": "51.36",
      "PP3": "71.22",
      "Target": "69.46"
    },
    {
      "category": "NOV24",
      "HD": "73.96",
      "PP12": "51.43",
      "PP3": "78.66",
      "Target": "69.46"
    },
    {
      "category": "DEC24",
      "HD": "75.78",
      "PP12": "52.18",
      "PP3": "73.18",
      "Target": "69.46"
    },
    {
      "category": "JAN25",
      "HD": "79.52",
      "PP12": "58.22",
      "PP3": "67.62",
      "Target": "69.46"
    },
    {
      "category": "FEB25",
      "HD": "80.39",
      "PP12": "62.51",
      "PP3": "62.10",
      "Target": "69.46"
    },
    {
      "category": "MAR25",
      "HD": "78.09",
      "PP12": "73.84",
      "PP3": "57.70",
      "Target": "69.46"
    },
    {
      "category": "APR25",
      "HD": "78.35",
      "PP12": "58.54",
      "PP3": "64.18",
      "Target": "69.46"
    }
  ];

  ngOnInit() {
    this.processChartData1();
    this.processChartData2();
  }

  ngAfterViewInit() {
    // Add timeout to ensure DOM elements are ready
    setTimeout(() => {
      if (this.chartDiv1?.nativeElement) {
        this.chart1 = Highcharts.chart(this.chartDiv1.nativeElement, this.chartOptions1);
      }
      if (this.chartDiv2?.nativeElement) {
        this.chart2 = Highcharts.chart(this.chartDiv2.nativeElement, this.chartOptions2);
      }
    });
  }

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1.destroy();
    }
    if (this.chart2) {
      this.chart2.destroy();
    }
  }

  processChartData2() {
    if (this.chartOptions2.xAxis && Array.isArray(this.chartOptions2.series)) {
      (this.chartOptions2.xAxis as any).categories = this.dataProvider2.map(item => item.category);
      
      const seriesData = [
        this.dataProvider2.map(item => parseFloat(item.HD)),
        this.dataProvider2.map(item => parseFloat(item.PP12)),
        this.dataProvider2.map(item => parseFloat(item.PP3)),
        this.dataProvider2.map(item => parseFloat(item.Target))
      ];
  
      seriesData.forEach((data, index) => {
        if (this.chartOptions2.series && this.chartOptions2.series[index]) {
          (this.chartOptions2.series[index] as any).data = data;
        }
      });
  
      if (this.chart2) {
        this.chart2.update(this.chartOptions2);
      }
    }
  }
}
