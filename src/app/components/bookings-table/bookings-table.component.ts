import { Component, HostListener, Renderer2, OnInit, Inject } from '@angular/core';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { Booking } from '../../booking';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books-service/books.service';
import { UserService } from '../../services/user-service/user.service';
import {FileService} from "../../services/file-service/file.service";
import {Subscription} from "rxjs";
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css'],
})

export class BookingsTableComponent implements OnInit{
  bookings: Booking[] = [];
  id: number = -1;
  bookName: string = "";
  sorter: string = "date";
  currentUser: string = "";
  expensesList: Booking[] = [];
  months: string[] = [];
  month: string = "";
  editBookingId: number | null = null;
  deleteId: number | null = null;
  fileContent: string | null = null;
  fileContentSubscription: Subscription | undefined;
  helpOpened: boolean = false;

  constructor(private bookingsService: BookingsService,
    private booksService: BooksService,
    private route: ActivatedRoute, private renderer: Renderer2,
    private userService: UserService, private fileService: FileService, @Inject(DOCUMENT) private document: Document
   ) {
    this.fileContentSubscription = this.fileService.getFileContentObservable().subscribe(
      (content: string) => {
        this.fileContent = content;
        this.processFileContent();
      }
    );
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.booksService.getName(this.id).subscribe(name => this.bookName = name);
    this.booksService.bookId = this.id;
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);

    this.months = this.bookingsService.getMonths(this.bookings);
    this.month = this.months[0];

    this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
    let user: string = "";
    this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
    this.currentUser = user;

    this.expensesList = this.bookingsService.getExpenses(this.bookings);

  }

  @HostListener('document:keypress', ['$event'])
  handleAddBookingShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'n') {
      this.addBookingPressed();
    }
  }

  displayDate(dateString: string): string{
    return new Date(dateString).toLocaleDateString("de", {day:"2-digit", month: "2-digit", year:"numeric"});
  }

  editBooking(id: number): void{
    this.editBookingId = id;
  }

  deleteBooking(id: number): void {
    this.deleteId = id;
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

  addBookingPressed(): void {
    this.editBookingId = -1;
  }

  closeDialog(isDialogOpen: boolean){
    if(!isDialogOpen){
      this.editBookingId = null;
      let focusElement = this.renderer.selectRootElement(".focus");
      focusElement.focus();

      if(this.bookings.length == 1){
        this.months = this.bookingsService.getMonths(this.bookings);
        this.month = this.months[0];
      }
      this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);
      this.months = this.bookingsService.getMonths(this.bookings);
      this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
      this.expensesList = this.bookingsService.getExpenses(this.bookings);
    }
  }

  dateChanged(month: string){
    this.month = month;
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);
    this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
    this.expensesList = this.bookingsService.getExpenses(this.bookings);
  }

  deletionDialogClosed(output: any){
    if (output !== null) {
      let id = Number(output);
      this.bookingsService.deleteBooking(id).subscribe();
      if(this.bookings.length == 0) {
        this.months = this.bookingsService.getMonths(this.bookings);
        this.month = this.months[0];
      }
      this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);
      this.months = this.bookingsService.getMonths(this.bookings);
      this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
      this.expensesList = this.bookingsService.getExpenses(this.bookings);
    }
    this.deleteId = null;
  }

  importFile(event: any) {
    const inputElement: HTMLInputElement = event.target;
    if (inputElement.files){
      this.fileService.importFile(event);
    }
  }

  processFileContent(){
    if (this.fileContent){
      let fileBookings = this.fileContent.split("\n");
      for (let booking of fileBookings){
        let bookingData = booking.split(";");
        this.bookingsService.addBooking(bookingData[0], bookingData[1], Number(bookingData[2]), JSON.parse(bookingData[3])).subscribe();
      }

      this.bookingsService.getBookings(this.id).subscribe(bookingsList => this.bookings = bookingsList);
      this.months = this.bookingsService.getMonths(this.bookings);
      this.month = this.months[0];
      this.bookings = this.bookingsService.filterMonth(this.bookings, this.month);
      this.expensesList = this.bookingsService.getExpenses(this.bookings);
      this.months = this.bookingsService.getMonths(this.bookings);
      this.fileContent = null;
    }
  }

  helpHovered(){
    this.helpOpened = true;
  }

  helpHoveredEnded(){
    this.helpOpened = false;
  }

  exportCsvClicked(){
    this.fileService.exportCsv(this.bookings, this.bookings[0].date);
  }
}
