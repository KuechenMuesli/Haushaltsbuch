import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app-component/app.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { AddBookingComplexComponent } from './components/add-booking-complex/add-booking-complex.component';
import { TotalAmountComponent } from './components/total-amount/total-amount.component';
import { MatIconModule } from '@angular/material/icon';
import { AddEditBookingDialogComponent } from './components/add-edit-booking-dialog/add-edit-booking-dialog.component';
import { FormsModule } from '@angular/forms';
import { EditBookingService } from './services/edit-booking-service/edit-booking.service';
import { AppRoutingModule } from './app-routing.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsTableComponent,
    AddBookingComplexComponent,
    TotalAmountComponent,
    AddEditBookingDialogComponent,
    MainMenuComponent
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
  providers: [EditBookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
