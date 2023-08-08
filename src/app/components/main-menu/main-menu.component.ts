import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../book';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { UserService } from '../../services/user-service/user.service';
import { Subscription } from 'rxjs';
import { Booking } from '../../booking';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{
  bookingsList: Book[] = [];
  accountBalance: number = 0;
  openBooksDialog: boolean = false;
  openUserDialog: boolean = false;
  users!: string[];
  loggedIn: boolean = false;
  currentUser: string = this.userService.currentUser;
  loggedInSubscription: Subscription;

  constructor (private booksService: BooksService, @Inject(DOCUMENT) private document: Document,
  private bookingsService: BookingsService, private userService: UserService, private changeDetectorRef: ChangeDetectorRef) {
    this.loggedInSubscription = this.userService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
    })
  }

  ngOnInit(): void {
    this.booksService.getBooksList()
      .subscribe(list => this.bookingsList = list);
    this.userService.getUsers();
    this.userService.currentUser = this.userService.users[0];
    this.booksService.getBooksList()
      .subscribe(list => this.bookingsList = list);
  }

  updateID(id: number){
    this.booksService.bookId = id;
  }
  addNewBook(): void{
    this.booksService.bookId = -1;
    this.openBooksDialog = true;
  }

  editBook(id: number){
    this.booksService.bookId = id;
    this.openBooksDialog = true;
  }
  deleteBook(id: number){
    this.booksService.deleteBook(id)
      .subscribe(index => {
        let table = this.document.getElementById('table-list') as HTMLTableElement;
        table.deleteRow(index);
      });
  }

  closeDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openBooksDialog = false;
      this.bookingsList = this.booksService.books;
    }
  }
  closeUserDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openUserDialog = false;
      if (this.userService.currentUser === ""){
        this.userService.deleteUser("");
      }
      this.userChanged();
    }
  }
  calculateAccountBalance(id:number){
    let bookings: Booking[] = [];
    this.bookingsService.getBookings(id).subscribe(bookingsList => bookings = bookingsList);
    this.accountBalance = this.bookingsService.calculateBookingsTotal(bookings);
    return this.accountBalance;
  }

  userChanged(){
    this.currentUser = this.userService.currentUser;
    this.booksService.getBooksList()
      .subscribe(list => this.bookingsList = list);
  }

  editUser(){
    this.openUserDialog = true;
  }

  loginDialogClosed(loginStatus: boolean){
    if(loginStatus){
      this.userChanged();
      this.loggedIn = true;
      this.changeDetectorRef.detectChanges();
      this.currentUser = this.userService.currentUser;
    }
  }
}
