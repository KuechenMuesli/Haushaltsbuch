import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksDialogService {
  private dialogOpenSubject = new Subject<boolean>();
  dialogOpen$: Observable<boolean> = this.dialogOpenSubject.asObservable();
  
  constructor() { }

  openDialog(){
    this.dialogOpenSubject.next(true);
  }

  closeDialog(){
    this.dialogOpenSubject.next(false);
  }
  
}
