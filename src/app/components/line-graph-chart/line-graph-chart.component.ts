import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Chart, registerables, Colors } from 'chart.js';
import { Booking } from '../../booking';


@Component({
  selector: 'app-line-graph-chart',
  templateUrl: './line-graph-chart.component.html',
  styleUrls: ['./line-graph-chart.component.css']
})
export class LineGraphChartComponent implements OnInit, OnChanges{
  public chart!: Chart<"line", number[], string>;
  @Input() bookings: Booking[] = [];
  amountValues: number[] = [];
  amountLabels: string[] = [];
  totalAmounts: number[] = [];

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.amountValues = this.bookings.map(booking => booking.amount);
    this.amountLabels = this.bookings.map(booking => new Date(booking.date).toLocaleDateString("de"));
    this.calculateAmounts();
    if(this.chart){
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){

    Chart.register(...registerables);

    this.chart = new Chart("LineGraph", {
      type: 'line',
      data: {
        labels: this.amountLabels,
        datasets: [{
          label: "Kontostand",
          data: this.totalAmounts,
          backgroundColor: "rgb(157, 138, 115)",
          borderColor: "rgb(220, 195, 162)"
        }],
      },
      options: {
        scales:{
          y:{
            ticks:{
              callback: function(value, index, ticks){
                return value + "€"
              },
              font: {
                family: "'Courier New', 'Courier', monospace",
                weight: "bold",
              }
            }
          },
          x:{
            ticks:{
              font:{
                family: "'Courier New', 'Courier', monospace",
                weight: "bold",
              }
            }
          }
        },
        responsive: true,
        plugins: {
          tooltip:{
            titleFont:{
              family: "'Courier New', 'Courier', monospace",
            },
            bodyFont:{
              family:"'Courier New', 'Courier', monospace",
            }
          },
          legend: {
            display: false,
          }
        }
      },
      });
  }

  calculateAmounts(){
    let sum: number = 0;
    this.totalAmounts = [];
    for(let maxIndex = 0; maxIndex < this.amountValues.length; maxIndex++){
      for(let curIndex = 0; curIndex <= maxIndex; curIndex++){
        sum += this.amountValues[curIndex];
      }
      this.totalAmounts.push(sum);
      sum = 0;
    }
  }

  updateChart(){
    this.calculateAmounts();
    this.chart.data.labels = this.amountLabels;
    this.chart.data.datasets.forEach((dataset) =>
      dataset.data = this.totalAmounts);
    this.chart.update();
  }
}
