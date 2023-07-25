import { Component } from '@angular/core';
import { BookingsDialogService } from '../../services/bookings-dialog-service/bookings-dialog.service';

@Component({
  selector: 'app-new-booking-button',
  templateUrl: './new-booking-button.component.html',
  styleUrls: ['./new-booking-button.component.css']
})

export class NewBookingButtonComponent {
  constructor (private bookingsDialogService: BookingsDialogService){
    }

  addBooking(): void{
    this.bookingsDialogService.addBooking();
    this.bookingsDialogService.openDialog();
  }
}
