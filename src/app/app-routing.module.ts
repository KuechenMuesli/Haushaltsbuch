import { NgModule } from '@angular/core';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component: MainMenuComponent},
  {path:'table/:id', component: BookingsTableComponent},
  {path:'main-menu', component: MainMenuComponent},
  {path:'table/:id/dashboard', component: DashboardComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
