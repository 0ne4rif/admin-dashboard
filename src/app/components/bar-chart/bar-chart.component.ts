import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  chart: any;

  constructor(
    private _service: DashboardService
  ) {
    
  }

  ngOnInit() {
    this.getBarChartData();
  }

  getBarChartData() {
    this._service.getDashboardMetaData().subscribe((response) => {
      console.log('Successful get bar chart data', response);
      let chartBar = response.chartBar;

      const xLabels = chartBar.map((chartBar: { name: any; }) => chartBar.name);
      const yValue = chartBar.map((chartBar: { value: any; }) => chartBar.value);

      const dataset = {
        labels: xLabels,
        datasets: [{
          label: 'Bar',
          data: yValue,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      };

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: dataset,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: true
            }
          }
        }
      });

    }, (error) => {
      console.log('Error getting bar chart data', error);
    });

  }

}

interface Bars {
  name: string;
  value: number;
}
