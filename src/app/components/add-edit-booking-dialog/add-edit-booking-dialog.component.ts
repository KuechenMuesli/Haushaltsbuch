import { Component, OnInit } from '@angular/core';
import { EditBookingService } from '../../services/edit-booking-service/edit-booking.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private editBookingService:EditBookingService, @Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder){

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
      date:['', Validators.required],
      description:['', Validators.required],
      amount:['', Validators.required]
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
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }

  closeDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close();
  }
  
}
