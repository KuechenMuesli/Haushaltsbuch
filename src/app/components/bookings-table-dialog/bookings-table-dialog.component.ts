import { Component, OnInit, Input, OnChanges, EventEmitter, Output,  Renderer2} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { Booking } from '../../booking';
import { TagsService } from '../../services/tags-service/tags.service';

@Component({
  selector: 'app-bookings-table-dialog',
  templateUrl: './bookings-table-dialog.component.html',
  styleUrls: ['./bookings-table-dialog.component.css']
})

export class BookingsTableDialogComponent implements OnInit, OnChanges{
  newBookingForm!: FormGroup;
  @Input() bookingId: number | null = null;
  @Output() dialogIsOpen = new EventEmitter<boolean>();

  tags: string[] = [];
  addedTags: string[] = [];
  date: string = "";
  description: string = "";
  amount: number = 0;
  dialogOpen: boolean = true;
  addTagDialogOpen: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document,
  private formBuilder: FormBuilder, private bookingsService: BookingsService, private renderer: Renderer2,
  private tagsService: TagsService
  ){}

  ngOnChanges(): void {
    if(this.bookingId !== null){
      this.showDialog();
      this.bookingsService.getTagsOfBooking(this.bookingId).subscribe(tagsList => this.tags = tagsList);
    }
  }

  ngOnInit(){
    this.createNewBookingForm();
    if(this.bookingId){
    this.bookingsService.getTagsOfBooking(this.bookingId).subscribe(tagsList => this.tags = tagsList);
    }
  }
  createNewBookingForm(){
    this.newBookingForm = this.formBuilder.group({
      date:[`${this.date}`, Validators.required],
      description:[`${this.description}`, Validators.required],
      amount:[`${+this.amount}`, Validators.required]
    })
  }

  showDialog(){
    if (this.bookingId == -1){
      this.date = new Date().toISOString().split('T')[0];
      this.description = "";
      this.amount = 0;
    }else if(this.bookingId !== null){
      let booking!: Booking;
      this.bookingsService.getBooking(this.bookingId).subscribe(returnedBooking => booking = returnedBooking);
      this.date= booking.date;
      this.description = booking.description;
      this.amount = booking.amount;
    }else{
      throw new Error("BookingId is undefined");
    }
    this.newBookingForm.patchValue({ date: this.date, description: this.description, amount: this.amount });
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    let descriptionElement = this.renderer.selectRootElement("#description");
    descriptionElement.focus();
    dia.show();
  }

  onSubmit(){
    if(this.newBookingForm.valid){
      let formData = this.newBookingForm.value;
      if (this.bookingId == -1){
        this.bookingsService.addBooking(formData.date, formData.description, formData.amount, this.addedTags).subscribe();
      }else if(this.bookingId !== null){
        this.bookingsService.getTagsOfBooking(this.bookingId).subscribe(tagsList => this.tags = tagsList.concat(this.addedTags));
        this.bookingsService.editBooking(this.bookingId, formData.date, formData.description, formData.amount, this.tags).subscribe();
      }else{
        throw new Error("BookingId is undefined")
      }
      this.addedTags = [];
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

  addTagPressed(){
    this.addTagDialogOpen = true;
  }

  deleteTagPressed(name: string){
    if(this.bookingId == null){
      throw new Error("BookingId is undefined")
    }
    this.bookingsService.deleteTag(this.bookingId, name);
    this.bookingsService.getTagsOfBooking(this.bookingId).subscribe(tagsList => this.tags = tagsList);
  }

  closeTagsDialog(addedTag: string | null){
    if (addedTag !== null){
      if(this.bookingId == null){
        throw new Error("BookingId is undefined");
      }
      this.bookingsService.getTagsOfBooking(this.bookingId).subscribe(tagsList => this.tags = tagsList);
      this.addedTags.push(addedTag);
      this.tags = this.tags.concat(this.addedTags);
    }
    this.addTagDialogOpen = false;
  }
}
