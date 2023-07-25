import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { BooksService } from '../books-service/books.service';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  bookings: Booking[] = this.booksService.getBookings(this.booksService.bookId);
  total_amount: number = 0;

  constructor(private booksService: BooksService) { }

  updateBookings(): void {
    this.bookings = this.booksService.getBookings(this.booksService.bookId);
  }

  calculate_total(id: number): number {
    this.bookings = this.booksService.getBookings(id);
    this.total_amount = 0;
    for (let i = this.bookings.length - 1; i >= 0; i--){
      this.total_amount += +this.bookings[i].amount;
    }
    return this.total_amount;
  }
}
