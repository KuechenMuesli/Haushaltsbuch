import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { Book } from '../../book';
import { BooksService } from '../books-service/books.service';

@Injectable({providedIn: 'root'})

export class BookingsService {
  bookId: number = this.booksService.bookId;
  bookingId!: number;
  constructor(private booksService: BooksService) { }
  getBookings(id: number): Booking[] {
    return this.booksService.books[this.booksService.books.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  new_id(): number {
    return this.booksService.books[this.bookId].bookingsList.length > 0? Math.max(...this.booksService.books[this.bookId].bookingsList.map(booking => booking.id)) + 1 : 0;
  }

  getBooking(id: number): Booking{
    let bookings = this.getBookings(this.bookId);
    let booking = bookings[bookings.findIndex(booking => booking.id == id)];
    return booking;
  }

  addBooking(date: string, description: string, amount: number): Booking[] {
    this.booksService.books[this.bookId].bookingsList.push({id:this.new_id(), date:date, description:description, amount:amount});
    this.booksService.updateBooks();
    return this.booksService.books[this.bookId].bookingsList;
  }

  deleteBooking(id: number): number{
    this.bookId = this.booksService.bookId;
    let index = this.booksService.books[this.bookId].bookingsList.findIndex(booking => booking.id === id);
    this.booksService.books[this.bookId].bookingsList.splice(index, 1);
    this.booksService.updateBooks();
    return index;
  }

  editBooking(id: number, date: string, description: string, amount: number): void {
    for (let i = 0; i < this.booksService.books[this.bookId].bookingsList.length; i++){
      if (this.booksService.books[this.bookId].bookingsList[i].id == id){
        this.booksService.books[this.bookId].bookingsList[i] = {
          id, date, description, amount
        };
        break;
      }
    }
    this.booksService.updateBooks();
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
