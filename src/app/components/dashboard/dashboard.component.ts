import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  id: number = -1;
  expensesList: Booking[] = [];
  bookings: Booking[] = [];
  currentUser: string = "";
  firstBookingDate: string = "";
  lastBookingDate: string = "";
  dateSelectForm!: FormGroup;

  constructor(private bookingsService: BookingsService, private route: ActivatedRoute, private userService: UserService,
    private formBuilder: FormBuilder,){
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.userService.currentUser;
    this.bookings = this.bookingsService.getBookings(this.id).sort((a, b) => (new Date(a.date).getTime()) - (new Date(b.date).getTime()));
    this.firstBookingDate = this.bookings[0].date;
    this.lastBookingDate = this.bookings[this.bookings.length - 1].date;
    this.createForm();
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
    this.bookings = this.bookingsService.filterTimespan(this.bookingsService.getBookings(this.id), data.startingDate, data.endingDate);
    this.expensesList = this.bookingsService.getExpenses(this.bookings);
    console.log(this.expensesList);
  }
}
