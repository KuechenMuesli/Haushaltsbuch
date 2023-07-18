import { Injectable } from '@angular/core';
import { BOOKINGS } from './bookings-list';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsTableService {

  getBookings(): Booking[] {
    return BOOKINGS;
  }

  constructor() { }
}
