import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { BOOKINGS } from '../../bookings-list';
import { BookingsList } from '../../bookings-list-interface';

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

  addBook(name: string, amount: number, description: string){
    let id: number = BOOKINGS.length > 0? Math.max(...BOOKINGS.map(bookingsList => bookingsList.id)) + 1 : 0;
    let date: string = new Date().toISOString().split('T')[0];
    console.log(id);
    BOOKINGS.push({id:id, name: name, bookingsList:[{id:0, date:date, description:description, amount:amount}]});
  }
getBookings(id: number): Booking[] {
  return BOOKINGS[BOOKINGS.findIndex(bookingsList => bookingsList.id == id)].bookingsList;
}
}
