import { Component } from '@angular/core';
import { EditBookingService } from '../edit-booking.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-add-edit-booking-dialog',
  templateUrl: './add-edit-booking-dialog.component.html',
  styleUrls: ['./add-edit-booking-dialog.component.css']
})

export class AddEditBookingDialogComponent {
  
  id: number = -1;
  date: string = "";
  description: string = "";
  amount: number = 0;
  isdialogOpen: boolean = true;

  submitBooking(date: string, description: string, amount: number): void{
    this.id = this.editBookingService.current_id;
    this.editBookingService.editBooking(this.id, date, description, amount);
  }

  showDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }
  constructor(private editBookingService:EditBookingService, @Inject(DOCUMENT) private document: Document){

    this.editBookingService.dialogOpen$.subscribe((isOpen) => {
    this.isdialogOpen = isOpen;
    if (this.isdialogOpen){
      this.showDialog();
    }
    })
}  
}
