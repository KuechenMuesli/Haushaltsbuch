import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../test-data';
import { Booking } from '../../booking';
import { BooksService } from '../books-service/books.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  bookId: number = this.booksService.bookId;
  constructor(private booksService: BooksService) { }

  getBookings(id: number): Booking[] {
    return BOOKINGS[BOOKINGS.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  new_id(): number {
    return BOOKINGS[this.bookId].bookingsList.length > 0? Math.max(...BOOKINGS[this.bookId].bookingsList.map(booking => booking.id)) + 1 : 0;
  }

  addBooking(date: string, description: string, amount: number): Booking[] {
    BOOKINGS[this.bookId].bookingsList.push({id:this.new_id(), date:date, description:description, amount:amount});
    return BOOKINGS[this.bookId].bookingsList;
  }

  deleteBooking(id: number): number{
    this.bookId = this.booksService.bookId;
    let index = BOOKINGS[this.bookId].bookingsList.findIndex(booking => booking.id === id);
    BOOKINGS[this.bookId].bookingsList.splice(index, 1);
    return index;
  }
}
