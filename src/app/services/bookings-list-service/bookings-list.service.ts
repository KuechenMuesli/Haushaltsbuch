import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { BOOKINGS } from '../../test-data';
import { BookingsList } from '../../book-interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsListService {
  bookingsListId: number = 0;

  constructor() { }

  setBookingsListId(value: number): void{
    this.bookingsListId = value;
  }

  getBookingsList(): BookingsList[]{
      return BOOKINGS;
  }

  getName(id: number): string{
    let index = BOOKINGS.findIndex(book => book.id == id);
    return BOOKINGS[index].name;
  }

  addBook(name: string){
    let id: number = BOOKINGS.length > 0? Math.max(...BOOKINGS.map(bookingsList => bookingsList.id)) + 1 : 0;
    let date: string = new Date().toISOString().split('T')[0];
    BOOKINGS.push({id:id, name: name, bookingsList:[]});
  }

  deleteBook(id: number): number{
    let index = BOOKINGS.findIndex(book => book.id == id);
    if (index !== -1) {
      BOOKINGS.splice(index, 1);
    }
    return index;
  }

  editBook(id:number, name: string){
    let index = BOOKINGS.findIndex(book => book.id == id);
    if (index !== -1){
      BOOKINGS[index].name = name;
    }
  }

getBookings(id: number): Booking[] {
  return BOOKINGS[BOOKINGS.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
}
}
