import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsListService {
  bookingsListIndex: number = 0;
  constructor() { }
}
