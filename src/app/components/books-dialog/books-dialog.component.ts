import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books-service/books.service';
import {Book} from "../../book";


@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css']
})
export class BooksDialogComponent implements OnInit, OnChanges{
  newBookForm!: FormGroup;
  name: string = "";
  id: number = -1;
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();


  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
  private booksService: BooksService){}

  ngOnChanges(): void {
    if(this.openDialog){
      this.showDialog();
    }
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
      if (this.booksService.bookId == -1){
        this.booksService.addBook(formData.name).subscribe();
      }else{
        this.booksService.editBook(this.booksService.bookId, formData.name).subscribe();
      }
    }
    this.closeDialog();
  }

  cancelEditing(){
    this.closeDialog();
  }

  showDialog(){
    this.name = "";
    if(this.booksService.bookId != -1){
      this.name = this.booksService.getName(this.booksService.bookId);
    }
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.show();
  }

  closeDialog(){
    this.dialogIsOpen.emit(false);
    let dia = this.document.getElementById("bookings-dialog") as HTMLDialogElement;
    dia.close();
  }
}
