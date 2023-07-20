import { Component } from '@angular/core';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';
import { Booking } from '../../booking';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  
  constructor (private bookingsListService: BookingsListService) {}
}
