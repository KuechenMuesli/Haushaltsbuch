import { Component, OnInit } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksDialogService } from '../../services/books-dialog-service/books-dialog.service';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';

@Component({
  selector: 'app-bookings-book-dialog',
  templateUrl: './bookings-book-dialog.component.html',
  styleUrls: ['./bookings-book-dialog.component.css']
})
export class BookingsBookDialogComponent implements OnInit{
  isdialogOpen: boolean = true;
  newBookForm!: FormGroup; 
  name: string = "";
  accountBalance: number = 0;


  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, 
  private booksDialogService: BooksDialogService, private bookingsListService: BookingsListService){
    this.booksDialogService.dialogOpen$.subscribe((isOpen) => {
      this.isdialogOpen = isOpen;
      if (this.isdialogOpen){
        this.showDialog();
      }
      })
  }

  ngOnInit(){
    this.createNewBookForm();
  }

  createNewBookForm(){
    this.newBookForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required],
      accountBalance:[`${this.accountBalance}`, Validators.required]
    })
  }

  onSubmit(){
    let formData;
    if(this.newBookForm.valid){
      formData = this.newBookForm.value; 
      this.bookingsListService.addBook(formData.name, formData.accountBalance, "Kontostand")
    }
    this.closeDialog()
  }

  cancelEditing(){

  }

  showDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }

  closeDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close()
  }
}
