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

  getExpenses(id: number): Booking[]{
    let bookings: Booking[] = this.getBookings(id);
    let expensesList: Booking[] = [];
    for(let i = 0; i < bookings.length; i++){
      if (bookings[i].amount < 0){
        let booking: Booking = {id:bookings[i].id, date:bookings[i].date, description:bookings[i].description, amount:bookings[i].amount *- 1}
        expensesList.push(booking);
      }
    }
    return expensesList;
  }

  convertMonthsList(){

  }

  getMonths(id: number): string[]{
    let bookings: Booking[] = this.booksService.getBookings(id);
    bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let months: string[] = [];
    let date: string[] = [];

    let monthsRefactor = [
      {numeral:"01", alpha:"Januar"},
      {numeral:"02", alpha:"Februar"},
      {numeral:"03", alpha:"März"},
      {numeral:"04", alpha:"April"},
      {numeral:"05", alpha:"Mai"},
      {numeral:"06", alpha:"Juni"},
      {numeral:"07", alpha:"Juli"},
      {numeral:"08", alpha:"August"},
      {numeral:"09", alpha:"September"},
      {numeral:"10", alpha:"Oktober"},
      {numeral:"11", alpha:"November"},
      {numeral:"12", alpha:"Dezember"}
    ];
    for (let i: number = 0; i < bookings.length; i++){
      date = bookings[i].date.split("-");
      for (let month of monthsRefactor){
        date[1] = date[1].replace(month.numeral, month.alpha);
      }
      let index = months.findIndex(month => month == `${date[1]} ${date[0]}`);
      if (index == -1){
        months.push(`${date[1]} ${date[0]}`);
      }
    }
    return months;
  }

  filterMonth(id:number, month:string): Booking[]{
    let bookings: Booking[] = this.booksService.getBookings(id);
    let filteredBookings: Booking[] = [];
    let monthsRefactor = [
      {numeral:"01", alpha:"Januar"},
      {numeral:"02", alpha:"Februar"},
      {numeral:"03", alpha:"März"},
      {numeral:"04", alpha:"April"},
      {numeral:"05", alpha:"Mai"},
      {numeral:"06", alpha:"Juni"},
      {numeral:"07", alpha:"Juli"},
      {numeral:"08", alpha:"August"},
      {numeral:"09", alpha:"September"},
      {numeral:"10", alpha:"Oktober"},
      {numeral:"11", alpha:"November"},
      {numeral:"12", alpha:"Dezember"}
    ];
    for (let i: number = 0; i < bookings.length; i++){
      let splitDate: string[] = bookings[i].date.split("-");
      for (let month of monthsRefactor){
        splitDate[1] = splitDate[1].replace(month.numeral, month.alpha);
      }

      let monthYear: string = splitDate[1] + " " + splitDate[0];
      if (monthYear == month){
        filteredBookings.push(bookings[i]);
      }
    }
    return filteredBookings;
  }
}
