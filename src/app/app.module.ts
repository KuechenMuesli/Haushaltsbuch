import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';
import { AddBookingComplexComponent } from './add-booking-complex/add-booking-complex.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsTableComponent,
    AddBookingComplexComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
