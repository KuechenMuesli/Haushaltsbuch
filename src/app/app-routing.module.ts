import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

const routes: Routes = [
  {path:'table', component: BookingsTableComponent},
  {path:'main-menu', component: MainMenuComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
