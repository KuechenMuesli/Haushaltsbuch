import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../test-data';
import { Booking } from '../../booking';
import { BooksService } from '../books-service/books.service';

@Injectable({providedIn: 'root'})

export class BookingsService {
  bookId: number = this.booksService.bookId;
  bookingId!: number;
  constructor(private booksService: BooksService) { }

  getBookings(id: number): Booking[] {
    return BOOKINGS[BOOKINGS.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  new_id(): number {
    return BOOKINGS[this.bookId].bookingsList.length > 0? Math.max(...BOOKINGS[this.bookId].bookingsList.map(booking => booking.id)) + 1 : 0;
  }

  getBooking(id: number): Booking{
    let bookings = this.getBookings(this.bookId);
    let booking = bookings[bookings.findIndex(booking => booking.id == id)];
    return booking;

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

  editBooking(id: number, date: string, description: string, amount: number): void {
    for (let i = 0; i < BOOKINGS[this.bookId].bookingsList.length; i++){
      if (BOOKINGS[this.bookId].bookingsList[i].id == id){
        BOOKINGS[this.bookId].bookingsList[i] = {
          id, date, description, amount
        };
        break;
      }
    }
  }

  calculateBookingsTotal(id: number): number{
    this.bookId = this.booksService.bookId;
    let bookings = this.booksService.getBookings(id);

    let total_amount = 0;
    for (let i = bookings.length - 1; i >= 0; i--){
      total_amount += +bookings[i].amount;
    }
    return total_amount;
  }
}
