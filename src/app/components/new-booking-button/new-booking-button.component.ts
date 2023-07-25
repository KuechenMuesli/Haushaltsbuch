import { Component } from '@angular/core';
import { EditBookingService } from '../../services/edit-booking-service/edit-booking.service';

@Component({
  selector: 'app-new-booking-button',
  templateUrl: './new-booking-button.component.html',
  styleUrls: ['./new-booking-button.component.css']
})

export class AddBookingComplexComponent {
  constructor (private editAddBookingsService: EditBookingService){
    }

  addBooking(): void{
    this.editAddBookingsService.addBooking();
    this.editAddBookingsService.openDialog();
  }
}
