import { Component, OnInit } from '@angular/core';
import { EditBookingService } from '../../services/edit-booking-service/edit-booking.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';

@Component({
  selector: 'app-add-edit-booking-dialog',
  templateUrl: './add-edit-booking-dialog.component.html',
  styleUrls: ['./add-edit-booking-dialog.component.css']
})

export class AddEditBookingDialogComponent implements OnInit{
  newBookingForm!: FormGroup; 

  id: number = -1;
  
  date: string = ""
  description: string = ""
  amount: number = 0;

  isdialogOpen: boolean = true;

  constructor(private editBookingService:EditBookingService, @Inject(DOCUMENT) private document: Document, 
  private formBuilder: FormBuilder, private bookingstableComponent: BookingsTableComponent
  ){
    this.editBookingService.dialogOpen$.subscribe((isOpen) => {
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
      this.id = this.editBookingService.current_id;
      this.editBookingService.editBooking(this.id, formData.date, formData.description, formData.amount);
    }
    this.closeDialog()
  }

  showDialog(){
    let shown_booking = this.editBookingService.getValues();
    this.id = shown_booking.id;
    this.date = shown_booking.date;
    if (this.date == ""){
      this.date = this.editBookingService.getCurrentDate();
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
