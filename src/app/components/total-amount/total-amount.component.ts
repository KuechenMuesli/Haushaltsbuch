import { Component } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { BookingsService } from '../../services/bookings-service/bookings.service';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})

export class TotalAmountComponent implements AfterContentChecked{
  total_amount: number = 0;
  
  constructor(private bookingsService: BookingsService){}
  
  ngOnInit(): void {
    this.calculateTotal();
  }

  ngAfterContentChecked(): void {
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.total_amount = this.bookingsService.calculateBookingsTotal(this.bookingsService.bookId);
  }
}
