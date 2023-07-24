import { Component } from '@angular/core';
import { EditBookingService } from '../../services/edit-booking-service/edit-booking.service';

@Component({
  selector: 'app-add-booking-complex',
  templateUrl: './add-booking-complex.component.html',
  styleUrls: ['./add-booking-complex.component.css']
})

export class AddBookingComplexComponent {
  constructor (private editAddBookingsService: EditBookingService){
    }

  addBooking(): void{
    this.editAddBookingsService.addBooking();
    this.editAddBookingsService.openDialog();
  }
}
