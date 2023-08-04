import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { UserService } from '../user-service/user.service';
import { Book } from '../../book';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  bookId: number = 0;
  data: Book[] = this.localStorageService.getData(this.userService.currentUser);
  books: Book[] = this.data.length > 0? this.data : [{id:0, name:"", bookingsList:[]}]

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }

  getBooksList(): Observable<Book[]> {
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, []);
  }

  getName(id: number): string{
    let index = this.books.findIndex(book => book.id == id);
    return this.books[index].name;
  }

  addBook(name: string){
    this.bookId = this.books.length > 0? Math.max(...this.books.map(bookingsList => bookingsList.id)) + 1 : 0;
    this.books.push({id:this.bookId, name: name, bookingsList:[]});
    this.localStorageService.saveData(this.userService.currentUser, this.books);
  }

  deleteBook(id: number): Observable<number> {
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, [])
      .pipe(
        map(books => {
          const index = books.findIndex(book => book.id == id);
          index !== -1 ? books.splice(index, 1) : null;
          return {
            index,
            books: books
          };
        })
      )
      .pipe(
        tap(bookingsWithIndex => {
          this.localStorageService.saveData(this.userService.currentUser, bookingsWithIndex.books);
        })
      )
      .pipe(
        map(bookingsWithIndex => bookingsWithIndex.index)
      );
  }

  editBook(id:number, name: string){
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, [])
      .pipe(
        map(books => {
          const index = books.findIndex(book => book.id == id);
          if (index !== -1){
            books[index].name = name;
          }
          return{
            books: books
          }
        })
      )
      .pipe(
        tap(books => {
          this.localStorageService.saveData(this.userService.currentUser, books.books);
        })
      );
  }

  getBookings(id: number): Booking[]{
    let books!: Book[];
    this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, []).subscribe(booksList => books = booksList);
    return books[books.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  updateBooks(){
    this.localStorageService.saveData(this.userService.currentUser, this.books);
  }
}
