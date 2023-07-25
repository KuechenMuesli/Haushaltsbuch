import { Component, OnInit} from '@angular/core';
import { BookingsDialogService } from '../../services/bookings-dialog-service/bookings-dialog.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';

@Component({
  selector: 'app-add-edit-booking-dialog',
  templateUrl: './bookings-table-dialog.component.html',
  styleUrls: ['./bookings-table-dialog.component.css']
})

export class BookingsTableDialogComponent implements OnInit{
  newBookingForm!: FormGroup; 

  id: number = -1;
  
  date: string = ""
  description: string = ""
  amount: number = 0;

  isdialogOpen: boolean = true;

  constructor(private bookingsDialogService:BookingsDialogService, @Inject(DOCUMENT) private document: Document, 
  private formBuilder: FormBuilder, private bookingstableComponent: BookingsTableComponent
  ){
    this.bookingsDialogService.dialogOpen$.subscribe((isOpen) => {
    this.isdialogOpen = isOpen;
    if (this.isdialogOpen){
      this.showDialog();
    }
    })
  }

  ngOnInit(){
    this.createNewBookingForm();
  }

  createNewBookingForm(){
    this.newBookingForm = this.formBuilder.group({
      date:[`${this.date}`, Validators.required],
      description:[`${this.description}`, Validators.required],
      amount:[`${+this.amount}`, Validators.required]
    })
  }

  onSubmit(){
    let formData;
    if(this.newBookingForm.valid){
      formData = this.newBookingForm.value; 
      this.id = this.bookingsDialogService.current_id;
      this.bookingsDialogService.editBooking(this.id, formData.date, formData.description, formData.amount);
    }
    this.closeDialog()
  }

  showDialog(){
    let shown_booking = this.bookingsDialogService.getValues();
    this.id = shown_booking.id;
    this.date = shown_booking.date;
    if (this.date == ""){
      this.date = this.bookingsDialogService.getCurrentDate();
    }
    this.description = shown_booking.description;
    this.amount = shown_booking.amount;
    this.createNewBookingForm();
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }

  cancelEditing(){
    this.closeDialog();
    if (this.description == ""){
      this.bookingstableComponent.deleteBooking(this.id);
    }
    
  }

  closeDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close();
  }
  
}
