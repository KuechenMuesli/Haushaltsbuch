import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app-component/app.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { AddBookingComplexComponent } from './components/new-booking-button/new-booking-button.component';
import { TotalAmountComponent } from './components/total-amount/total-amount.component';
import { MatIconModule } from '@angular/material/icon';
import { AddEditBookingDialogComponent } from './components/bookings-table-dialog/bookings-table-dialog.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { BookingsBookDialogComponent } from './components/bookings-book-dialog/bookings-book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsTableComponent,
    AddBookingComplexComponent,
    TotalAmountComponent,
    AddEditBookingDialogComponent,
    MainMenuComponent,
    BookingsBookDialogComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
