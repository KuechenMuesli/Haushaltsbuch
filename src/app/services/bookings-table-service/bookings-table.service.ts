import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../bookings-list';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';
import { BookingsList } from '../../bookings-list-interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsTableService {
  bookingsListId: number = this.bookingsListService.bookingsListId;
  constructor(private bookingsListService: BookingsListService) { }

  getBookings(id: number): Booking[] {
    return BOOKINGS[BOOKINGS.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  new_id(): number {
    return BOOKINGS[this.bookingsListId].bookingsList.length > 0? Math.max(...BOOKINGS[this.bookingsListId].bookingsList.map(booking => booking.id)) + 1 : 0;
  }

  addBooking(date: string, description: string, amount: number): Booking[] {
    BOOKINGS[this.bookingsListId].bookingsList.push({id:this.new_id(), date:date, description:description, amount:amount});
    return BOOKINGS[this.bookingsListId].bookingsList;
  }

  deleteBooking(id: number): number{
    this.bookingsListId = this.bookingsListService.bookingsListId;
    let index = BOOKINGS[this.bookingsListId].bookingsList.findIndex(booking => booking.id === id);
    BOOKINGS[this.bookingsListId].bookingsList.splice(index, 1);
    return index;
  }

}
