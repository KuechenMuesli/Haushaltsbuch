import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../bookings-list';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';


@Injectable({
  providedIn: 'root'
})
export class BookingsTableService {
  bookingsListIndex: number = this.bookingsListService.bookingsListIndex;
  constructor(private bookingsListService: BookingsListService) { }
  getBookings(): Booking[] {
    return BOOKINGS[this.bookingsListIndex];
  }

  new_id(): number {
    return BOOKINGS[this.bookingsListIndex].length > 0? Math.max(...BOOKINGS[this.bookingsListIndex].map(booking => booking.id)) + 1 : 0;
  }

  addBooking(date: string, description: string, amount: number): Booking[] {
    BOOKINGS[this.bookingsListIndex].push({id:this.new_id(), date:date, description:description, amount:amount});
    return BOOKINGS[this.bookingsListIndex];
  }

  deleteBooking(id: number): number{
    let index = BOOKINGS[this.bookingsListIndex].findIndex(booking => booking.id === id);
    BOOKINGS.splice(index, 1);
    return index;
  }

}
