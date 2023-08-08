import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { Book } from '../../book';
import { BooksService } from '../books-service/books.service';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { UserService } from '../user-service/user.service';
import { Observable, findIndex, map, retry, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class BookingsService {
  bookId: number = this.booksService.bookId;
  bookingId!: number;
  constructor(private booksService: BooksService, private localStorageService: LocalStorageService, private userService: UserService) { }

  getBookings(id: number): Observable<Booking[]> {
    return this.booksService.getBooksList()
      .pipe(
        map(books => {
          let bookings: Booking[] = [];
          if (books[books.findIndex(book => book.id == id)]){
            bookings = books[books.findIndex(book => book.id == id)].bookingsList;
          }
          return bookings;
      }))
  }

  new_id(): number {
    let books: Book[] = [];
    this.booksService.getBooksList().subscribe(booksList => books = booksList);
    return books[books.findIndex(book => book.id == this.bookId)].bookingsList.length > 0? Math.max(...books[books.findIndex(book => book.id == this.bookId)].bookingsList.map(booking => booking.id)) + 1 : 0;
  }

  getBooking(id: number): Observable<Booking>{
    return this.getBookings(this.booksService.bookId)
      .pipe(
        map(bookings => {
          return bookings[bookings.findIndex(booking => booking.id == id)];
        })
      )
  }

  addBooking(date: string, description: string, amount: number, tags: string[]){
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, [])
      .pipe(
        map(books => {
          let bookIndex = books.findIndex(book => book.id == this.bookId);
          books[bookIndex].bookingsList.push({id:this.new_id(), date:date, description:description, amount:amount, tags:tags});
          return{
            books
          }
        })
      )
      .pipe(
        tap(allBooks =>{
          this.localStorageService.saveData(this.userService.currentUser, allBooks.books);
          this.booksService.books[allBooks.books.findIndex(book => book.id == this.bookId)].bookingsList.push({id:this.new_id(), date:date, description:description, amount:amount, tags:tags});
        })
      )
  }

  deleteBooking(id: number): Observable<any>{
    return this.booksService.getBooksList()
      .pipe(
        map(books => {
          const bookIndex: number = books.findIndex(book => book.id == this.bookId);
          let bookings: Booking[] = books[bookIndex].bookingsList;
          let bookingIndex: number = bookings.findIndex(booking => booking.id == id);
          bookingIndex !== -1 ? bookings.splice(bookingIndex, 1) : null;
          return {

            bookIndex,
            bookings
          }
        })
      )
      .pipe(
        tap(bookingsAndIndex => {
          let newBooksList: Book[] = [];
          this.booksService.getBooksList().subscribe(booksList => newBooksList = booksList);
          newBooksList[bookingsAndIndex.bookIndex].bookingsList = bookingsAndIndex.bookings;
          this.localStorageService.saveData(this.userService.currentUser, newBooksList);
        }
        )
      )
  }

  editBooking(id: number, date: string, description: string, amount: number, tags: string[]): void {
    let bookings: Booking[] = this.booksService.getBookings(this.booksService.bookId);
    let bookingsIndex: number = bookings.findIndex(booking => id == booking.id);
    if (bookingsIndex !== -1){
      this.booksService.books[this.booksService.bookId].bookingsList[bookingsIndex] = {id, date, description, amount, tags};
    }
    this.localStorageService.saveData(this.userService.currentUser, this.booksService.books);
  }

  calculateBookingsTotal(bookings: Booking[]): number{
    this.bookId = this.booksService.bookId;

    let total_amount = 0;
    for (let i = bookings.length - 1; i >= 0; i--){
      total_amount += +bookings[i].amount;
    }
    return total_amount;
  }

  getExpenses(bookingsList: Booking[]): Booking[]{
    let expensesList: Booking[] = [];
    for(let i = 0; i < bookingsList.length; i++){
      if (bookingsList[i].amount < 0){
        let booking: Booking = {id:bookingsList[i].id, date:bookingsList[i].date, description:bookingsList[i].description, amount:bookingsList[i].amount *- 1, tags:bookingsList[i].tags}
        expensesList.push(booking);
      }
    }
    return expensesList;
  }

  convertMonthsList(){

  }

  calculateExpensesAmount(id: number): number[]{
    let totalExpenses: number = 0;
    let totalEarnings: number = 0;
    let bookings: Booking[] = []
    this.getBookings(id).subscribe(bookingsList => bookings = bookingsList);
    for(let booking of bookings){
      let amount: number = booking.amount;
      if(amount < 0) {
          amount *= -1;
          totalExpenses += amount;
      }else {
          totalEarnings += amount;
      }
    }
    return [totalExpenses, totalEarnings];
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

  filterMonth(bookingsList: Booking[], month:string): Booking[]{
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
    for (let i: number = 0; i < bookingsList.length; i++){
      let splitDate: string[] = bookingsList[i].date.split("-");
      for (let month of monthsRefactor){
        splitDate[1] = splitDate[1].replace(month.numeral, month.alpha);
      }

      let monthYear: string = splitDate[1] + " " + splitDate[0];
      if (monthYear == month){
        filteredBookings.push(bookingsList[i]);
      }
    }
    return filteredBookings;
  }

  filterTimespan(bookings: Booking[], startingDate: string, endingDate: string): Booking[]{
    let filteredBookings: Booking[] = [];
    let startingUnix: number = new Date(startingDate).getTime();
    let endingUnix: number = new Date(endingDate).getTime();
    bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    for(let booking of bookings){
      let bookingDateTime: number = new Date(booking.date).getTime();
      if (bookingDateTime >= startingUnix && bookingDateTime <= endingUnix){
        filteredBookings.push(booking);
      }
    }
    return filteredBookings;
  }

  getTagsOfBooking(id: number): string[]{
    if(id >= 0){
      let booking!: Booking;
      this.getBooking(id).subscribe(returnedBooking => booking = returnedBooking);
      return booking.tags;
    }
    return [];
  }

  deleteTag(id:number, name:string){
    let booking!: Booking;
    this.getBooking(id).subscribe(returnedBooking => booking = returnedBooking);
    let index: number = booking.tags.findIndex(tagName => tagName == name);
    if (index != -1){
      booking.tags.splice(index, 1);
    }
  }
}
