import { Component } from '@angular/core';
import { Booking } from '../booking';
import { BookingsTableService } from '../bookings-table.service';
import { TotalAmountComponent } from '../total-amount/total-amount.component';
import { TotalAmountService } from '../total-amount.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-booking-complex',
  templateUrl: './add-booking-complex.component.html',
  styleUrls: ['./add-booking-complex.component.css']
})

export class AddBookingComplexComponent {

  addBooking(date: string, description: string, amount: number): void{
    this.bookingsTableService.addBooking(date, description, amount);
    this.totalAmountService.calculate_total();
    this.changeDetectorRef.markForCheck();
  }
  constructor (private bookingsTableService: BookingsTableService, 
    private totalAmountService: TotalAmountService,
    private changeDetectorRef: ChangeDetectorRef
    ){}
}
