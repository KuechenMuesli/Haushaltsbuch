import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { BookingsDialogService } from '../../services/bookings-dialog-service/bookings-dialog.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { Booking } from '../../booking';

@Component({
  selector: 'app-add-edit-booking-dialog',
  templateUrl: './bookings-table-dialog.component.html',
  styleUrls: ['./bookings-table-dialog.component.css']
})

export class BookingsTableDialogComponent implements OnInit, OnChanges{
  newBookingForm!: FormGroup; 
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();


  id: number = -1;
  
  date: string = ""
  description: string = ""
  amount: number = 0;

  isdialogOpen: boolean = true;

  constructor(private bookingsDialogService:BookingsDialogService, @Inject(DOCUMENT) private document: Document, 
  private formBuilder: FormBuilder, private bookingstableComponent: BookingsTableComponent,
  private bookingsService: BookingsService,
  ){
    this.bookingsDialogService.dialogOpen$.subscribe((isOpen) => {
    this.isdialogOpen = isOpen;
    if (this.isdialogOpen){
      this.showDialog();
    }
    })
  }

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
    this.id = this.bookingsService.bookingId;

    if (this.id == -1){
      this.date = this.bookingsDialogService.getCurrentDate();
      this.description = "";
      this.amount = 0;
    }else{
      let booking: Booking = this.bookingsService.getBooking(this.id);
      this.date= booking.date;
      this.description = booking.description;
      this.amount = booking.amount;
    }
    this.createNewBookingForm();
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }

  onSubmit(){
    if(this.newBookingForm.valid){
      let formData = this.newBookingForm.value; 
      if (this.id == -1){
        this.bookingsService.addBooking(formData.date, formData.description, formData.amount);
      }else{
        this.bookingsService.editBooking(this.id, formData.date, formData.description, formData.amount);
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
