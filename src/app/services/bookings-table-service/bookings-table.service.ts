import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../bookings-list';
import { Booking } from '../../booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsTableService {
  
  getBookings(): Booking[] {
    return BOOKINGS;
  }

  new_id(): number {
    return BOOKINGS.length > 0? Math.max(...BOOKINGS.map(booking => booking.id)) + 1 : 0;
  }

  addBooking(date: string, description: string, amount: number): Booking[] {
    BOOKINGS.push({id:this.new_id(), date:date, description:description, amount:amount});
    return BOOKINGS;
  }

  deleteBooking(id: number): number{
    let index = BOOKINGS.findIndex(booking => booking.id === id);
    BOOKINGS.splice(index, 1);
    return index;
  }

  constructor() { }
}
