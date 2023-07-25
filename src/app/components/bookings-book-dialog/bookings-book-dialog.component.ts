import { Component, OnInit } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksDialogService } from '../../services/books-dialog-service/books-dialog.service';
import { BookingsListService } from '../../services/books-service/books.service';

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
  id: number = -1;


  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, 
  private booksDialogService: BooksDialogService, private bookingsListService: BookingsListService){
    this.booksDialogService.dialogOpen$.subscribe((isOpen) => {
      this.isdialogOpen = isOpen;
      if (this.isdialogOpen){
        this.name = this.booksDialogService.name;
        this.showDialog();
      }
      })
  }

  ngOnInit(){
    this.createNewBookForm();
  }

  createNewBookForm(){
    this.newBookForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required]
    })
  }

  onSubmit(){
    let formData;
    if(this.newBookForm.valid){
      formData = this.newBookForm.value; 
      if (this.booksDialogService.id == -1){
        this.bookingsListService.addBook(formData.name);
      }else{
        this.bookingsListService.editBook(this.booksDialogService.id, formData.name);
      }
    }
    this.closeDialog()
  }

  cancelEditing(){
    this.closeDialog();
  }

  showDialog(){
    this.name = this.booksDialogService.name;
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show()
  }

  closeDialog(){
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close()
  }
}
