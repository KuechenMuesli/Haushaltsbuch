import { Component } from '@angular/core';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';
import { BookingsList } from '../../bookings-list-interface';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { BooksDialogService } from '../../services/books-dialog-service/books-dialog.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  bookingsList: BookingsList[] = this.bookingsListService.getBookingsList();
  constructor (private bookingsListService: BookingsListService, @Inject(DOCUMENT) private document: Document,
  private booksDialogService: BooksDialogService) {}

  updateID(id: number){
    this.bookingsListService.bookingsListId = id;
  }
  addNewBook(): void{
    this.booksDialogService.openDialog(-1);
}

  editBook(id: number){
    this.booksDialogService.openDialog(id);
  }
  deleteBook(id: number){
    let index: number = this.bookingsListService.deleteBook(id);
    let table = this.document.getElementById('table-list') as HTMLTableElement;
    table.deleteRow(index);
  }
}
