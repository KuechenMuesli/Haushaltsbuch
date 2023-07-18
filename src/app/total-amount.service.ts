import { Injectable } from '@angular/core';
import { BOOKINGS } from './bookings-list';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  total_amount: number = 0;

  calculate_total(): void {
    this.total_amount = 0;
    for (let i = BOOKINGS.length - 1; i >= 0; i--){
      this.total_amount += BOOKINGS[i].amount;
    }
  }
  

  constructor() { }
}
