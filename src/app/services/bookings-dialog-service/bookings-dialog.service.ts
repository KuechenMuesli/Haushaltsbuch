import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BOOKINGS } from '../../test-data';
import { Booking } from '../../booking';
import { BooksService } from '../books-service/books.service';

@Injectable({
  providedIn: 'root'
})

export class BookingsDialogService {
  current_id: number = -1;
  private dialogOpenSubject = new Subject<boolean>();
  dialogOpen$: Observable<boolean> = this.dialogOpenSubject.asObservable();
  bookId: number = this.booksService.bookId;

  constructor(private booksService: BooksService) { }
  

  getValues(): Booking{
    this.bookId = this.booksService.bookId;
    let index = BOOKINGS[this.bookId].bookingsList.findIndex(booking => booking.id === this.current_id);
    return BOOKINGS[this.bookId].bookingsList[index];
  }

  openDialog(){
    this.dialogOpenSubject.next(true);
  }

  closeDialog(){
    this.dialogOpenSubject.next(false);
  }

  setCurrentId(id: number): void{
    this.current_id = id;
  }
  
  addBooking(): void{
    let next_id: number = BOOKINGS[this.bookId].bookingsList.length > 0? Math.max(...BOOKINGS[this.bookId].bookingsList.map(booking => booking.id)) + 1 : 0;
    BOOKINGS[this.bookId].bookingsList.push({id:next_id, date:"", description:"", amount:0});
    this.current_id = next_id;
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

  deleteBooking(){
    let index = BOOKINGS[this.bookId].bookingsList.findIndex(booking => booking.id === this.current_id);
    delete BOOKINGS[index];
  }

  getCurrentDate(): string{
    return new Date().toISOString().split('T')[0];
  }

}
