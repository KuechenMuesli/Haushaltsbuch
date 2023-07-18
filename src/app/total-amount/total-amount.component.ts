import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BOOKINGS } from '../bookings-list';
import { TotalAmountService } from '../total-amount.service';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})

export class TotalAmountComponent implements AfterViewChecked{
  total_amount: number = 0;
  
  ngOnInit(): void {
    this.calculateTotal();
  }

  ngAfterViewChecked(): void {
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalAmountService.calculate_total();
    this.total_amount = this.totalAmountService.total_amount;
  }

  constructor(private totalAmountService: TotalAmountService,
    private changeDetectorRef: ChangeDetectorRef){}
}
