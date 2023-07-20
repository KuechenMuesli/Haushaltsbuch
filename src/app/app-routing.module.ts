import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'table', component: BookingsTableComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
