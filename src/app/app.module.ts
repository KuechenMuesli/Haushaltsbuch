import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app-component/app.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { TotalAmountComponent } from './components/total-amount/total-amount.component';
import { MatIconModule } from '@angular/material/icon';
import { BookingsTableDialogComponent } from './components/bookings-table-dialog/bookings-table-dialog.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { BooksDialogComponent } from './components/books-dialog/books-dialog.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { BookingsPieChartComponent } from './components/bookings-pie-chart/bookings-pie-chart.component';
import { AddTagDialogComponent } from './components/add-tag-dialog/add-tag-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsTableComponent,
    TotalAmountComponent,
    BookingsTableDialogComponent,
    MainMenuComponent,
    BooksDialogComponent,
    UserDialogComponent,
    BookingsPieChartComponent,
    AddTagDialogComponent
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
