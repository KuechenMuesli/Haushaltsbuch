import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../bookings-list';

@Injectable({
  providedIn: 'root'
})
export class BookingsListService {
  bookingsListIndex: number = 1;

  constructor() { }
}
