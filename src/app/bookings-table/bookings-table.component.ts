import { Component } from '@angular/core';
import { BookingsTableService } from '../bookings-table.service';
import { BOOKINGS } from '../bookings-list';
@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent {
  bookings = BOOKINGS;
}
