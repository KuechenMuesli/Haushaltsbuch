import { Component } from '@angular/core';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';
import { Booking } from '../../booking';
import { BookingsList } from '../../bookings-list-interface';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  bookingsList: BookingsList[] = this.bookingsListService.getBookingsList();
  constructor (private bookingsListService: BookingsListService) {}

  addNewBook(): void{
    this.bookingsListService.addBook("Test 2", 1000, "Startguthaben");
  }
}
