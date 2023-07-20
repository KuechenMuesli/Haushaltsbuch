import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  bookingsListId: number = this.bookingsListService.bookingsListId;
  bookings: Booking[] = this.bookingsListService.getBookings(this.bookingsListId);
  total_amount: number = 0;

  constructor(private bookingsListService: BookingsListService) { }

  updateBookings(): void {
    this.bookingsListId = this.bookingsListService.bookingsListId;
    this.bookings = this.bookingsListService.getBookings(this.bookingsListId);
  }

  calculate_total(): void {
    this.bookingsListId = this.bookingsListService.bookingsListId;
    this.bookings = this.bookingsListService.getBookings(this.bookingsListId);
    this.bookings 
    this.total_amount = 0;
    for (let i = this.bookings.length - 1; i >= 0; i--){
      this.total_amount += +this.bookings[i].amount;
    }
  }
}
