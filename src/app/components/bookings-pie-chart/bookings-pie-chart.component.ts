import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Booking } from '../../booking';

@Component({
  selector: 'app-bookings-pie-chart',
  templateUrl: './bookings-pie-chart.component.html',
  styleUrls: ['./bookings-pie-chart.component.css']
})
export class BookingsPieChartComponent implements OnInit, OnChanges{
  public chart!: Chart<"pie", number[], string>;
  @Input() expenses!: Booking[];
  totalExpenses: number = 0;
  expensesValues: number[] = [];
  expensesLabels: string[] = [];

  ngOnChanges(){
    this.updateChart();
  }

  ngOnInit(){
    this.createChart();
  }
  createChart(){
    this.totalExpenses = 0;
    let expensesValues: number[] = this.expensesValues;
    let expensesLabels: string[] = this.expensesLabels;

    Chart.register(...registerables);
    this.chart = new Chart("BookingsChart", {
      type: 'pie',

      data: {
        labels: expensesLabels,
	      datasets: [{
        data: expensesValues,
        
        hoverOffset: 10
      }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed + ' €';
                        return label;
                    },
                },
            },
        },
    },
    });
  }

  updateDataLists(){
    let expensesValues: number[] = [];
    let expensesLabels: string[] = [];
    let expensesLabelsIndex;
    for(let i = 0; i < this.expenses.length; i++){
      this.totalExpenses += this.expenses[i].amount;
      expensesLabelsIndex = expensesLabels.findIndex(description => this.expenses[i].description == description);
      if(expensesLabelsIndex != -1){
        expensesValues[expensesLabelsIndex] += this.expenses[i].amount;
      }else{
        expensesValues.push(this.expenses[i].amount);
        expensesLabels.push(this.expenses[i].description);
      }
    }
    this.expensesLabels = expensesLabels;
    this.expensesValues = expensesValues;
  }

  updateChart(){
    this.updateDataLists();
    this.chart.data.labels = this.expensesLabels;
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = this.expensesValues;
    })
    this.chart.update();
  }
}
