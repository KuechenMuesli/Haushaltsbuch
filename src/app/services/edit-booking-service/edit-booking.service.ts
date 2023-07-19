import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BOOKINGS } from '../../bookings-list';

@Injectable({
  providedIn: 'root'
})

export class EditBookingService {
  current_id: number = -1;
  private dialogOpenSubject = new Subject<boolean>();
  dialogOpen$: Observable<boolean> = this.dialogOpenSubject.asObservable();

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
    let next_id: number = BOOKINGS.length > 0? Math.max(...BOOKINGS.map(booking => booking.id)) + 1 : 0;
    BOOKINGS.push({id:next_id, date:"", description:"", amount:0});
    this.current_id = next_id;
  }

  editBooking(id: number, date: string, description: string, amount: number): void {
    for (let i = 0; i < BOOKINGS.length; i++){
      if (BOOKINGS[i].id == id){
        BOOKINGS[i] = {
          id, date, description, amount
        };
        break;
      }
    }
  }

  constructor() { }
}
