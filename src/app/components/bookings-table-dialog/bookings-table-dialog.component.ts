import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges, Renderer2} from '@angular/core';
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
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();

  tags: string[] = this.getTags();
  addedTags: string[] = [];
  date: string = "";
  description: string = "";
  amount: number = 0;
  
  isdialogOpen: boolean = true;
  addTagDialogOpen: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, 
  private formBuilder: FormBuilder, private bookingsService: BookingsService, private renderer: Renderer2,
  private tagsService: TagsService
  ){}

  ngOnChanges(): void {
    if(this.openDialog){
      this.showDialog();
      this.tags = this.getTags();
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
    let descriptionElement = this.renderer.selectRootElement("#description");
    descriptionElement.focus();
    dia.show();
  }

  onSubmit(){
    if(this.newBookingForm.valid){
      let formData = this.newBookingForm.value; 
      if (this.bookingsService.bookingId == -1){
        this.bookingsService.addBooking(formData.date, formData.description, formData.amount, this.addedTags).subscribe();
      }else{
        this.tags = this.bookingsService.getTagsOfBooking(this.bookingsService.bookingId).concat(this.addedTags);
        this.bookingsService.editBooking(this.bookingsService.bookingId, formData.date, formData.description, formData.amount, this.tags);
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

  getTags(): string[]{
    if (this.bookingsService.bookingId == -1){
      return [];
    }
    return this.bookingsService.getTagsOfBooking(this.bookingsService.bookingId);
  }

  addTagPressed(){
    this.addTagDialogOpen = true;
  }

  deleteTagPressed(name: string){
    this.bookingsService.deleteTag(this.bookingsService.bookingId, name);
  }

  closeTagsDialog(dialogIsOpen: boolean){
    if(!dialogIsOpen){
      this.addTagDialogOpen = false;
      if(this.tagsService.addedTag !== ""){
        this.addedTags.push(this.tagsService.addedTag);
        this.tags = this.getTags().concat(this.addedTags);
      }
    }
  }
}
