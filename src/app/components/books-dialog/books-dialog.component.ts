import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books-service/books.service';


@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css']
})
export class BooksDialogComponent implements OnInit, OnChanges{
  isdialogOpen: boolean = true;
  newBookForm!: FormGroup;
  name: string = "";
  accountBalance: number = 0;
  id: number = -1;
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();


  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
  private booksService: BooksService){}

  ngOnChanges(changes: SimpleChanges): void {
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
        this.booksService.addBook(formData.name);
      }else{
        this.booksService.editBook(this.booksService.bookId, formData.name).subscribe(books => this.booksService.books = books.books);
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
