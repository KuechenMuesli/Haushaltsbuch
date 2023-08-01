import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Chart, registerables, Colors } from 'chart.js';

import { Booking } from '../../booking';
import { TagsService } from '../../services/tags-service/tags.service';

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
  tagsList: string[] = [];
  tagDialogOpen: boolean = false;

  constructor(private tagsService: TagsService,){}
  ngOnChanges(){
    this.updateChart();
  }

  ngOnInit(){
    this.createChart();
  }

  openTagDialog(){
    this.tagDialogOpen = true;
  }

  createChart(){
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
        borderColor: "#faebd7",
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += `: `;
                        }
                        label += context.parsed + ' €';
                        return label;
                    },
                },
            },
        },
    },
    });
    this.updateChart();
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
    this.totalExpenses = 0;
    this.updateDataLists();
    this.chart.data.labels = this.expensesLabels;
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = this.expensesValues;
      dataset.backgroundColor = [
        "rgb(220, 195, 162)",
        "rgb(234, 212, 182)",
        "rgb(157, 138, 115)",
        "rgb(234, 216, 192)",
        "rgb(200, 184, 163)",
        "rgb(214, 191, 162)",
        "rgb(202, 172, 135)",
        "rgb(162, 150, 129)"
      ]
    })
    Chart.register(Colors);
    this.chart.update();
  }
  closeTagsDialog(dialogIsOpen: boolean){
    console.log(dialogIsOpen);
    if(!dialogIsOpen){
      this.tagDialogOpen = false;
      this.tagsList.push(this.tagsService.addedTag);
      console.log(this.tagsList);
    }
  }
}
