import { Component } from '@angular/core';
import { BookingsDialogService } from '../../services/bookings-dialog-service/bookings-dialog.service';
import { BookingsService } from '../../services/bookings-service/bookings.service';

@Component({
  selector: 'app-new-booking-button',
  templateUrl: './new-booking-button.component.html',
  styleUrls: ['./new-booking-button.component.css']
})

export class NewBookingButtonComponent {
  openDialog: boolean = false;

  constructor (private bookingsService: BookingsService){
    }

  addBooking(): void{
    this.bookingsService.bookingId = -1;
    this.openDialog = true;
  }

  closeDialog(isDialogOpen: boolean){
    if(!isDialogOpen){
      console.log("hallo");
      this.openDialog = false;
    }
  }
}
