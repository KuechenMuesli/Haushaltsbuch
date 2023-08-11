import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { UserService } from '../user-service/user.service';
import { Book } from '../../book';
import {Observable, map, tap, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  bookId: number = 0;

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }

  getBooksList(): Observable<Book[]> {
    let user = "";
    this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser)
    return this.localStorageService.getData<Book[]>(user, []);
  }

  getName(id: number): Observable<string>{
    return this.getBooksList()
      .pipe(map(books => {
          let index: number = books.findIndex(book => book.id == id);
          return books[index].name;
        }
      ))
  }

  addBook(name: string): Observable<void>{
    return this.getBooksList()
      .pipe(map(books => {
          this.bookId = books.length > 0? Math.max(...books.map(bookingsList => bookingsList.id)) + 1 : 0;
          books.push({id:this.bookId, name:name, bookingsList:[]});
          let user = "";
          this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
          return {
            books: books,
            user: user
          }
        }
      ))
      .pipe(
        tap(booksUser => {
            this.localStorageService.saveData(booksUser.user, booksUser.books);
          }
        )
      )
      .pipe(
        map(() => {return})
      )
  }

  deleteBook(id: number): Observable<number> {
    return this.userService.getLoggedInUser()
      .pipe(
        switchMap(user => this.localStorageService.getData<Book[]>(user, [])
          .pipe(
            map(books => {
                const index = books.findIndex(book => book.id == id);
                index !== -1 ? books.splice(index, 1) : null;
                let user = "";
                this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
                return {
                  index: index,
                  books: books,
                  user: user
                };
              })
          )
          .pipe(
            tap(bookingsWithIndex => {
                this.localStorageService.saveData(bookingsWithIndex.user, bookingsWithIndex.books);
                return bookingsWithIndex;
              }
            )
          )
          .pipe(map(
            bookingsWithIndex => bookingsWithIndex.index
          ))
        )
      )
  }

  editBook(id:number, name: string){
    return this.userService.getLoggedInUser()
      .pipe(
        switchMap(user => this.localStorageService.getData<Book[]>(user, [])
          .pipe(
            map(books => {
              const index = books.findIndex(book => book.id == id);
              if (index !== -1){
                books[index].name = name;
              }
              let user = ""
              this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
              return{
                books: books,
                user: user
              }
            })
          )
        )
      )
      .pipe(
        tap(booksUser => {
          this.localStorageService.saveData(booksUser.user, booksUser.books);
        })
      );
  }

  getBookings(id: number): Observable<Booking[]>{
    let currentUser = "";
    this.userService.getLoggedInUser().subscribe(returnedUser => currentUser = returnedUser);
    return this.localStorageService.getData<Book[]>(currentUser, [])
      .pipe(
        map(books => {
          return books[books.findIndex(book => book.id == id)].bookingsList;
          }
        )
      )
  }
}
