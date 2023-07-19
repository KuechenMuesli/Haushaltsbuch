import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';
import { AddBookingComplexComponent } from './add-booking-complex/add-booking-complex.component';
import { TotalAmountComponent } from './total-amount/total-amount.component';
import { MatIconModule } from '@angular/material/icon';
import { AddEditBookingDialogComponent } from './add-edit-booking-dialog/add-edit-booking-dialog.component';
import { FormsModule } from '@angular/forms';
import { EditBookingService } from './edit-booking.service';

@NgModule({
  declarations: [
    AppComponent,
    BookingsTableComponent,
    AddBookingComplexComponent,
    TotalAmountComponent,
    AddEditBookingDialogComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [EditBookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
