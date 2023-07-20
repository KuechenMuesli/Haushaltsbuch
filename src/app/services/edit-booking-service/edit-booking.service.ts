import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BOOKINGS } from '../../bookings-list';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';

@Injectable({
  providedIn: 'root'
})

export class EditBookingService {
  current_id: number = -1;
  private dialogOpenSubject = new Subject<boolean>();
  dialogOpen$: Observable<boolean> = this.dialogOpenSubject.asObservable();
  bookingsListIndex: number = this.bookingsListService.bookingsListIndex;

  constructor(private bookingsListService: BookingsListService) { }


  getValues(): Booking{
    let index = BOOKINGS[this.bookingsListIndex].findIndex(booking => booking.id === this.current_id);
    return BOOKINGS[this.bookingsListIndex][index];
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
    let next_id: number = BOOKINGS.length > 0? Math.max(...BOOKINGS[this.bookingsListIndex].map(booking => booking.id)) + 1 : 0;
    BOOKINGS[this.bookingsListIndex].push({id:next_id, date:"", description:"", amount:0});
    this.current_id = next_id;
  }

  editBooking(id: number, date: string, description: string, amount: number): void {
    for (let i = 0; i < BOOKINGS.length; i++){
      if (BOOKINGS[this.bookingsListIndex][i].id == id){
        BOOKINGS[this.bookingsListIndex][i] = {
          id, date, description, amount
        };
        break;
      }
    }
  }

  deleteBooking(){
    let index = BOOKINGS[this.bookingsListIndex].findIndex(booking => booking.id === this.current_id);
    delete BOOKINGS[index];
  }

  getCurrentDate(): string{
    return new Date().toISOString().split('T')[0];
  }

}
