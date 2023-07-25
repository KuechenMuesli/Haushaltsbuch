import { Component } from '@angular/core';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';
import { BookingsList } from '../../book-interface';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { BooksDialogService } from '../../services/books-dialog-service/books-dialog.service';
import { TotalAmountService } from '../../services/total-amount-service/total-amount.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  bookingsList: BookingsList[] = this.bookingsListService.getBookingsList();
  accountBalance: number = 0;
  
  constructor (private bookingsListService: BookingsListService, @Inject(DOCUMENT) private document: Document,
  private booksDialogService: BooksDialogService, private totalAmountService: TotalAmountService) {}

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

  calculateAccountBalance(id:number){
    this.accountBalance = this.totalAmountService.calculate_total(id);
    return this.accountBalance;
  }
}
