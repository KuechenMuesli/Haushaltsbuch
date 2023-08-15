import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { Book } from '../../book';
import { BooksService } from '../books-service/books.service';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { UserService } from '../user-service/user.service';
import {Observable, map, tap, of, switchMap} from 'rxjs';

@Injectable({providedIn: 'root'})

export class BookingsService {
  bookId: number = this.booksService.bookId;
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
      }));
  }
  private new_id(books: Booking[]): number {
    return books.length === 0
      ? 1
      : books
          .map(b => b.id)
          .sort((a,b) =>  b - a)[0] + 1;
  }
  getBooking(id: number): Observable<Booking>{
    return this.getBookings(this.booksService.bookId)
      .pipe(
        map(bookings => {
          return bookings[bookings.findIndex(booking => booking.id == id)];
        })
      )
  }

  addBooking(date: string, description: string, amount: number, tags: string[]): Observable<Book[]>{
    return this.userService.getLoggedInUser()
      .pipe(
        switchMap(user => this.localStorageService.getData<Book[]>(user, [])
          .pipe(
            map(books => {
              let book = books.find(book => book.id == this.bookId);
              if (!book) {
                throw new Error(`Book with id ${this.bookId} not found`)
              }
              book.bookingsList.push({
                id: this.new_id(book.bookingsList),
                date,
                description,
                amount,
                tags});
              return books;
            })
          )
          .pipe(
            tap(allBooks =>{
              this.userService.getLoggedInUser()
                .pipe(
                  map(user => {
                    this.localStorageService.saveData(user, allBooks);
                  })
                ).subscribe().unsubscribe()

            })
          ))
      );
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
          this.booksService.getBooksList()
            .pipe(map(newBooksList => {
              newBooksList[bookingsAndIndex.bookIndex].bookingsList = bookingsAndIndex.bookings;
              let user: string = "";

              this.userService.getLoggedInUser()
                .pipe(
                  map(user => {
                    this.localStorageService.saveData(user, newBooksList);
                  })
                ).subscribe().unsubscribe()
            })
            ).subscribe().unsubscribe()
        }
        )
      )
  }

  editBooking(id: number, date: string, description: string, amount: number, tags: string[]): Observable<void> {
      return this.getBookings(this.booksService.bookId)
        .pipe(
            map(bookings => {
                let bookingsIndex: number = bookings.findIndex(curBooking => curBooking.id == id);
                let books: Book[] = [];
                if (bookingsIndex !== -1){
                    bookings[bookingsIndex] = {id, date, description, amount, tags}
                    this.booksService.getBooksList()
                      .pipe(map(booksList => {
                        books = booksList;
                        }
                      )).subscribe()
                    let bookIndex: number = books.findIndex(book => book.id == this.booksService.bookId);
                    books[bookIndex].bookingsList = bookings;
                }
                return { books: books }
            }
          )
        )
        .pipe(
            tap(books => {
              this.userService.getLoggedInUser()
                .pipe(
                  map(user => {
                    this.localStorageService.saveData(user, books.books)
                  })
                ).subscribe()
            }
            )
        )
        .pipe(
          map(
            () => {return}
          )
        )
  }

  calculateBookingsTotal(bookings: Booking[]): Observable<number>{
    this.bookId = this.booksService.bookId;

    let total_amount = 0;
    for (let i = bookings.length - 1; i >= 0; i--){
      total_amount += bookings[i].amount;
    }
    return of(total_amount);
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

  getMonths(bookings: Booking[]): string[]{
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

  getTagsOfBooking(id: number): Observable<string[]>{
    return this.getBooking(id)
      .pipe(
        map(booking => {
            let tagsList: string[] = []
            if(booking){
              tagsList = booking.tags;
            }
            return tagsList;
          }
        )
      )
  }

  deleteTag(id:number, name:string){
    let booking: Booking = {id:-1, date:"", description:"", amount:-1, tags:[]};
    this.getBooking(id).subscribe(returnedBooking => booking = returnedBooking);
    let index: number = booking.tags.findIndex(tagName => tagName == name);

    if (index !== -1){
      booking.tags.splice(index, 1);
      let books: Book[] = [];
      this.booksService.getBooksList().subscribe(booksList => books = booksList);
      let bookIndex = books.findIndex(book => book.id == this.booksService.bookId);
      let bookingIndex: number = books[bookIndex].bookingsList.findIndex(booking => booking.id == id);
      books[bookIndex].bookingsList[bookingIndex] = booking;
      let user = "";
      this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
      this.localStorageService.saveData(user, books);
    }
  }
}
