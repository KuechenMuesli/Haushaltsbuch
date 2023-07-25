import { Component } from '@angular/core';
import { BooksService } from '../../services/books-service/books.service';
import { BookingsList } from '../../book';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { BooksDialogService } from '../../services/books-dialog-service/books-dialog.service';
import { BookingsService } from '../../services/bookings-service/bookings.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  bookingsList: BookingsList[] = this.booksService.getBookingsList();
  accountBalance: number = 0;
  
  constructor (private booksService: BooksService, @Inject(DOCUMENT) private document: Document,
  private booksDialogService: BooksDialogService, private bookingsService: BookingsService) {}

  updateID(id: number){
    this.booksService.bookId = id;
  }
  addNewBook(): void{
    this.booksDialogService.openDialog(-1);
}

  editBook(id: number){
    this.booksDialogService.openDialog(id);
  }
  deleteBook(id: number){
    let index: number = this.booksService.deleteBook(id);
    let table = this.document.getElementById('table-list') as HTMLTableElement;
    table.deleteRow(index);
  }

  calculateAccountBalance(id:number){
    this.accountBalance = this.bookingsService.calculateBookingsTotal(id);
    return this.accountBalance;
  }
}
