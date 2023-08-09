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
  data: Book[] = this.setBooks();
  books: Book[] = this.data.length > 0? this.data : []

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }

  setBooks(): Book[]{
    let booksList: Book[] = [];
    this.localStorageService.getDataObservable(this.userService.currentUser, []).subscribe(books => booksList = books);
    return booksList;
  }

  getBooksList(): Observable<Book[]> {
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, []);
  }

  getName(id: number): string{
    this.books = this.setBooks();
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
          this.setBooks();
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

  getBookings(id: number): Observable<Booking[]>{
    return this.localStorageService.getDataObservable<Book[]>(this.userService.currentUser, [])
      .pipe(
        map(books => {
          return books[books.findIndex(book => book.id == id)].bookingsList;
          }
        )
      )
  }

  updateBooks(){
    this.localStorageService.saveData(this.userService.currentUser, this.books);
  }
}
