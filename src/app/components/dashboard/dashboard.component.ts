import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books-service/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  id: number = -1;
  bookName: string = "";
  totalAmount: number = 0;
  totalExpenses: number = 0;
  totalEarnings: number = 0;

  expensesList: Booking[] = [];
  bookings: Booking[] = [];
  currentUser: string = "";
  firstBookingDate: string = "";
  lastBookingDate: string = "";
  dateSelectForm!: FormGroup;

  constructor(private bookingsService: BookingsService, private route: ActivatedRoute, private userService: UserService,
    private formBuilder: FormBuilder, private booksService: BooksService){
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookName = this.booksService.getName(this.id);
    this.currentUser = this.userService.currentUser;
    let bookings: Booking[] = [];
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => bookings = bookingsList);
    this.bookings = bookings.sort((a, b) => (new Date(a.date).getTime()) - (new Date(b.date).getTime()));
    this.firstBookingDate = this.bookings[0].date;
    this.lastBookingDate = this.bookings[this.bookings.length - 1].date;
    this.createForm();

    this.totalAmount = this.bookingsService.calculateBookingsTotal(this.bookings);
    [this.totalExpenses, this.totalEarnings] = this.bookingsService.calculateExpensesAmount(this.id);
    this.onSubmit();
  }

  createForm(){
    this.dateSelectForm = this.formBuilder.group({
      startingDate: [this.firstBookingDate, Validators.required],
      endingDate:   [this.lastBookingDate, Validators.required]
    })
  }

  onSubmit(){
    let data = this.dateSelectForm.value;
    let bookings: Booking[] = [];
    this.bookingsService.getBookings(this.id).subscribe(bookingsList => bookings = bookingsList);
    this.bookings = this.bookingsService.filterTimespan(bookings, data.startingDate, data.endingDate);
    this.expensesList = this.bookingsService.getExpenses(this.bookings);
  }
}
