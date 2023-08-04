import { Component, HostListener, Renderer2 } from '@angular/core';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { Booking } from '../../booking';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books-service/books.service';
import { UserService } from '../../services/user-service/user.service';


@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})

export class BookingsTableComponent {
  bookings: Booking[] = [];
  id: number = -1;
  bookName: string = "";
  sorter: string = "date";
  openDialog: boolean = false;
  currentUser: string = "";
  expensesList: Booking[] = [];
  months: string[] = [];
  month: string = "";
  monthSelect = this.document.getElementById("#monthSelect") as HTMLSelectElement;


  constructor(private bookingsService: BookingsService, 
    @Inject(DOCUMENT) private document: Document, 
    private booksService: BooksService,
    private route: ActivatedRoute, private renderer: Renderer2,
    private userService: UserService
   ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookName = this.booksService.getName(this.id);
    this.booksService.bookId = this.id;

    this.months = this.bookingsService.getMonths(this.id);
    this.month = this.months[0];
    let bookings: Booking[] = []
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => bookings = bookingsList)
    this.bookings = this.bookingsService.filterMonth(bookings, this.month);
  
    this.currentUser = this.userService.currentUser;

    this.expensesList = this.bookingsService.getExpenses(this.bookings);
  }

  @HostListener('document:keypress', ['$event'])
  handleAddBookingShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'n') {
      this.addBookingPressed();
    }
  }

  displayDate(dateString: string){
    let date = new Date(dateString);
    return date.getDate()+"."+(date.getMonth() + 1 + "." + date.getFullYear())
  }

  editBooking(id: number): void{
    this.bookingsService.bookingId = id;
    this.openDialog = true;
  }

  deleteBooking(id: number): void {
    let index = -1;
    let bookings: Booking[] = [];
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => bookings = bookingsList);
    this.bookingsService.deleteBooking(id).subscribe(bookingsIndex => index = bookingsIndex);
    this.bookings = this.bookingsService.filterMonth(bookings, this.month);
    this.expensesList = this.bookingsService.getExpenses(this.bookings);
    this.months = this.bookingsService.getMonths(this.id);
  }

  sortTableByDate(): void{
    if (this.sorter == "date"){
      this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.sorter = "";
    }else{
      this.sorter = "date";
      this.bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

  sortBookingsByAmount(): void {
    if (this.sorter == "amount"){
      this.bookings.sort((a, b) => b.amount - a.amount);
      this.sorter = "";
    }else{
      this.sorter = "amount";
      this.bookings.sort((a, b) => a.amount - b.amount);
    }
  }

  addBookingPressed(): void{
    this.bookingsService.bookingId = -1;
    this.openDialog = true;
  }

  closeDialog(isDialogOpen: boolean){
    if(!isDialogOpen){
      this.openDialog = false;
      let focusElement = this.renderer.selectRootElement(".focus");
      focusElement.focus();

      let bookings: Booking[] = [];
      this.bookingsService.getBookings(this.id).subscribe(bookingsList => bookings = bookingsList);

      this.bookings = this.bookingsService.filterMonth(bookings, this.month);
      this.expensesList = this.bookingsService.getExpenses(this.bookings);
      this.months = this.bookingsService.getMonths(this.id);

    }
  }

  dateChanged(month: string){
    this.month = month;
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);
    this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
    this.expensesList = this.bookingsService.getExpenses(this.bookings);
  }
}
