import { Component } from '@angular/core';
import { BookingsTableService } from '../../services/bookings-table-service/bookings-table.service';
import { Booking } from '../../booking';
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
    this.bookings = this.bookingsTableService.getBookings();
  }

  getBookings(): void {
      this.bookings = this.bookingsTableService.getBookings();
  }

  deleteBooking(id: number): void {
    let index = this.bookingsTableService.deleteBooking(id);
    this.getBookings();
    let table = this.document.getElementById('bookingsTable') as HTMLTableElement;
      table.deleteRow(index + 1);
  }
}