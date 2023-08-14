import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  openBooksDialog: boolean = false;
  openUserDialog: boolean = false;
  loggedIn: boolean = false;
  currentUser: string = "";
  loggedInSubscription: Subscription;
  deleteId: number | string | null = null;

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
    this.booksService.getBooksList()
      .subscribe(list => this.bookingsList = list);
    this.userService.getLoggedInUser().subscribe(returnedUser => this.currentUser = returnedUser);
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
    this.deleteId = id;
  }

  closeDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openBooksDialog = false;
      this.booksService.getBooksList().subscribe(booksList => this.bookingsList = booksList);
    }
  }
  closeUserDialog(dialogIsOpen: boolean){
    if (!dialogIsOpen){
      this.openUserDialog = false;
      let user: string = "";
      this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
      if (user === ""){
        this.userService.deleteUser("");
      }
      this.userChanged();
    }
  }
  calculateAccountBalance(id:number){
    let bookings: Booking[] = [];
    this.bookingsService.getBookings(id).subscribe(bookingsList => bookings = bookingsList);
    let accountBalance = 0;
    this.bookingsService.calculateBookingsTotal(bookings).subscribe(balance => accountBalance = balance);
    return accountBalance;
  }

  userChanged(){
    this.userService.getLoggedInUser().subscribe(returnedUser => this.currentUser = returnedUser);
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
      this.userService.getLoggedInUser().subscribe(returnedUser => this.currentUser = returnedUser);
    }
  }

  deleteUserClicked(){
    this.userService.getLoggedInUser().subscribe(user => this.deleteId = user);
  }
  deletionDialogClosed(output: any){
    this.deleteId = null;
    if(output !== null){
      if(typeof output === "number"){
        let outputId: number = Number(output);
        this.booksService.deleteBook(outputId).subscribe(index => {
          let table = this.document.getElementById('table-list') as HTMLTableElement;
          table.deleteRow(index);
        });
      }else if(typeof output === "string"){
        let user = output.toString();
        this.userService.deleteUser(user);
      }
    }
  }
}
