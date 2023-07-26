import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { Booking } from '../../booking';

@Component({
  selector: 'app-bookings-table-dialog',
  templateUrl: './bookings-table-dialog.component.html',
  styleUrls: ['./bookings-table-dialog.component.css']
})

export class BookingsTableDialogComponent implements OnInit, OnChanges{
  newBookingForm!: FormGroup; 
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();
  
  date: string = "";
  description: string = "";
  amount: number = 0;

  isdialogOpen: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document, 
  private formBuilder: FormBuilder, private bookingstableComponent: BookingsTableComponent,
  private bookingsService: BookingsService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.openDialog){
      this.showDialog();
    }
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

  showDialog(){
    if (this.bookingsService.bookingId == -1){
      this.date = new Date().toISOString().split('T')[0];
      this.description = "";
      this.amount = 0;
    }else{
      let booking: Booking = this.bookingsService.getBooking(this.bookingsService.bookingId);
      this.date= booking.date;
      this.description = booking.description;
      this.amount = booking.amount;
    }
    this.newBookingForm.patchValue({ date: this.date, description: this.description, amount: this.amount });
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show();
  }

  onSubmit(){
    if(this.newBookingForm.valid){
      let formData = this.newBookingForm.value; 
      if (this.bookingsService.bookingId == -1){
        this.bookingsService.addBooking(formData.date, formData.description, formData.amount);
      }else{
        this.bookingsService.editBooking(this.bookingsService.bookingId, formData.date, formData.description, formData.amount);
      }
    }
    this.closeDialog();
  }

  cancelEditing(){
    this.closeDialog();
  }

  closeDialog(){
    this.dialogIsOpen.emit(false);
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close();
  }
  
}
