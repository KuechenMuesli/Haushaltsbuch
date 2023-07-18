import { Component } from '@angular/core';
import { BookingsTableService } from '../bookings-table.service';
import { BOOKINGS } from '../bookings-list';
import { Booking } from '../booking';


@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent {
  bookings: Booking[] = [];
  
ngOnInit(): void {
  
  this.getBookings();
}


getBookings(): void {
    this.bookings = this.bookingsTableService.getBookings();
}

constructor(private bookingsTableService: BookingsTableService) {}
}
