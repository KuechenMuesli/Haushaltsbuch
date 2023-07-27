import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { UserService } from '../user-service/user.service';
import { Book } from '../../book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  bookId: number = 0;
  data: Book[] = this.localStorageService.getData(this.userService.currentUser);
  books: Book[] = this.data.length > 0? this.data : [{id:0, name:"", bookingsList:[]}]

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }

  getBookingsList(): Book[]{
    this.books = this.localStorageService.getData(this.userService.currentUser);
    return this.books;
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

  deleteBook(id: number): number{
    let index = this.books.findIndex(book => book.id == id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
    this.localStorageService.saveData(this.userService.currentUser, this.books);
    return index;
  }

  editBook(id:number, name: string){
    let index = this.books.findIndex(book => book.id == id);
    if (index !== -1){
      this.books[index].name = name;
    }
    this.localStorageService.saveData(this.userService.currentUser, this.books);
  }

  getBookings(id: number): Booking[] {
    return this.books[this.books.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
  }

  updateBooks(){
    this.localStorageService.saveData(this.userService.currentUser, this.books);
  }
}
