import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';


@Injectable({
  providedIn: 'root'
})
export class BooksDialogService {
  private dialogOpenSubject = new Subject<boolean>();
  dialogOpen$: Observable<boolean> = this.dialogOpenSubject.asObservable();
  id: number = -1;
  name: string = "";

  constructor(private bookingsListService: BookingsListService) { }

  openDialog(id: number){
    this.id = id;

    if (this.id !== -1){
      this.name = this.bookingsListService.getName(id);
    }else{
      this.name = "";
    }
    this.dialogOpenSubject.next(true);
  }

  closeDialog(){
    this.dialogOpenSubject.next(false);
  }
}
