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
  bookingsListId: number = this.bookingsListService.bookingsListId;

  constructor(private bookingsListService: BookingsListService) { }


  getValues(): Booking{
    this.bookingsListId = this.bookingsListService.bookingsListId;
    let index = BOOKINGS[this.bookingsListId].bookingsList.findIndex(booking => booking.id === this.current_id);
    return BOOKINGS[this.bookingsListId].bookingsList[index];
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
    let next_id: number = BOOKINGS[this.bookingsListId].bookingsList.length > 0? Math.max(...BOOKINGS[this.bookingsListId].bookingsList.map(booking => booking.id)) + 1 : 0;
    BOOKINGS[this.bookingsListId].bookingsList.push({id:next_id, date:"", description:"", amount:0});
    this.current_id = next_id;
  }

  editBooking(id: number, date: string, description: string, amount: number): void {
    for (let i = 0; i < BOOKINGS[this.bookingsListId].bookingsList.length; i++){
      if (BOOKINGS[this.bookingsListId].bookingsList[i].id == id){
        BOOKINGS[this.bookingsListId].bookingsList[i] = {
          id, date, description, amount
        };
        break;
      }
    }
  }

  deleteBooking(){
    let index = BOOKINGS[this.bookingsListId].bookingsList.findIndex(booking => booking.id === this.current_id);
    delete BOOKINGS[index];
  }

  getCurrentDate(): string{
    return new Date().toISOString().split('T')[0];
  }

}
