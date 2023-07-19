import { Component } from '@angular/core';
import { Booking } from '../booking';
import { BookingsTableService } from '../bookings-table.service';
import { TotalAmountComponent } from '../total-amount/total-amount.component';
import { TotalAmountService } from '../total-amount.service';
import { ChangeDetectorRef } from '@angular/core';
import { EditBookingService } from '../edit-booking.service';

@Component({
  selector: 'app-add-booking-complex',
  templateUrl: './add-booking-complex.component.html',
  styleUrls: ['./add-booking-complex.component.css']
})

export class AddBookingComplexComponent {
  constructor (private bookingsTableService: BookingsTableService, 
    private totalAmountService: TotalAmountService,
    private changeDetectorRef: ChangeDetectorRef,
    private editAddBookingsService: EditBookingService
    ){}

  bookings: Booking[] = this.bookingsTableService.getBookings();
  latest_date: string = this.bookings[this.bookings.length - 1].date;

  addBooking(): void{
    this.editAddBookingsService.addBooking();
    this.editAddBookingsService.openDialog();
    this.changeDetectorRef.markForCheck();
  }
  
}
