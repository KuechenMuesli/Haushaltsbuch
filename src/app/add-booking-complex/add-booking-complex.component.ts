import { Component } from '@angular/core';
import { Booking } from '../booking';
import { BookingsTableService } from '../bookings-table.service';

@Component({
  selector: 'app-add-booking-complex',
  templateUrl: './add-booking-complex.component.html',
  styleUrls: ['./add-booking-complex.component.css']
})

export class AddBookingComplexComponent {

  addBooking(date: string, description: string, amount: number): void{
    this.bookingsTableService.addBooking(date, description, amount);
  }
  constructor (private bookingsTableService: BookingsTableService){}
}
