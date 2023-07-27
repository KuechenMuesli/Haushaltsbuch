import { Component } from '@angular/core';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../book';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { BookingsService } from '../../services/bookings-service/bookings.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  bookingsList: Book[] = this.booksService.getBookingsList();
  accountBalance: number = 0;
  openDialog: boolean = false;
  
  constructor (private booksService: BooksService, @Inject(DOCUMENT) private document: Document,
  private bookingsService: BookingsService) {}

  updateID(id: number){
    this.booksService.bookId = id;
  }
  addNewBook(): void{
    this.booksService.bookId = -1;
    this.openDialog = true;
  }

  editBook(id: number){
    this.booksService.bookId = id;
    this.openDialog = true;
  }
  deleteBook(id: number){
    let index: number = this.booksService.deleteBook(id);
    let table = this.document.getElementById('table-list') as HTMLTableElement;
    table.deleteRow(index);
  }
  closeDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openDialog = false;
    }
  }

  calculateAccountBalance(id:number){
    this.accountBalance = this.bookingsService.calculateBookingsTotal(id);
    return this.accountBalance;
  }
}
