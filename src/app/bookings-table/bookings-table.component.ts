import { Component } from '@angular/core';
import { BookingsTableService } from '../bookings-table.service';
import { BOOKINGS } from '../bookings-list';
import { Booking } from '../booking';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 



@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})

export class BookingsTableComponent {
  bookings: Booking[] = [];
  
  constructor(private bookingsTableService: BookingsTableService, @Inject(DOCUMENT) private document: Document) {
  }
  ngOnInit(): void {
    
    this.getBookings();
  }

  getBookings(): void {
      this.bookings = this.bookingsTableService.getBookings();
  }

  deleteBooking(id: number): void {
    this.bookingsTableService.deleteBooking(id);
    
    let table = this.document.getElementById("bookingsTable") as HTMLTableElement;
    table.deleteRow(id);

    this.getBookings();
  }


}
