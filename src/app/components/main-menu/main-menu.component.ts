import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../book';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { UserService } from '../../services/user-service/user.service';


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
  
  constructor (private booksService: BooksService, @Inject(DOCUMENT) private document: Document,
  private bookingsService: BookingsService, private userService: UserService) {}

  ngOnInit(): void {
    this.bookingsList = this.booksService.getBookingsList();
    this.userService.getUsers();
    this.userService.currentUser = this.userService.users[0];
    this.bookingsList = this.booksService.getBookingsList();
    this.updateUsers();
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
    let index: number = this.booksService.deleteBook(id);
    let table = this.document.getElementById('table-list') as HTMLTableElement;
    table.deleteRow(index);
  }

  closeDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openBooksDialog = false;
    }
  }
  closeUserDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openUserDialog = false;
      if (this.userService.currentUser === ""){
        this.userService.deleteUser("");
      }
      this.updateUsers();
      this.userChanged(this.userService.currentUser);
    }
  }
  calculateAccountBalance(id:number){
    this.accountBalance = this.bookingsService.calculateBookingsTotal(this.bookingsService.getBookings(id));
    return this.accountBalance;
  }

  userChanged(selectedUser: string){
    this.userService.currentUser = selectedUser;
    this.bookingsList = this.booksService.getBookingsList();
  }

  updateUsers(){
    this.users = this.userService.users;
  }

  addUser(){
    this.userService.addUser("");
    this.userService.currentUser = "";
    this.openUserDialog = true;
  }

  editUser(){
    this.openUserDialog = true;
  }

  loginDialogClosed(loginStatus: boolean){
    if(loginStatus){
      this.loggedIn = true;
    }
  }
}
