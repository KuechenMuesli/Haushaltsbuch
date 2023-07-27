import { Component, OnInit } from '@angular/core';
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
  openDialog: boolean = false;
  users: string[] = []
  
  constructor (private booksService: BooksService, @Inject(DOCUMENT) private document: Document,
  private bookingsService: BookingsService, private userService: UserService) {}

  ngOnInit(): void {
    this.bookingsList = this.booksService.getBookingsList();
    this.userService.getUsers();
    this.updateUsers();
    this.userService.currentUser = this.userService.users[0];
  }

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

  userChanged(selectedUser: string){
    this.userService.currentUser = selectedUser;
    this.bookingsList = this.booksService.getBookingsList();
  }

  updateUsers(){
    this.users = this.userService.users;

  }

  addUser(){
    this.userService.addUser("Test");
  }
}
