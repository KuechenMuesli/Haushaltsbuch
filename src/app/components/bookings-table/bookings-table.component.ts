import { Component } from '@angular/core';
import { BookingsTableService } from '../../services/bookings-table-service/bookings-table.service';
import { Booking } from '../../booking';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { EditBookingService } from '../../services/edit-booking-service/edit-booking.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';


@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})

export class BookingsTableComponent {
  bookings: Booking[] = [];
  id: number = -1;
  bookName: string = "";
  sorter: string = "date";

  constructor(private bookingsTableService: BookingsTableService, 
    @Inject(DOCUMENT) private document: Document, 
    private bookingsListService: BookingsListService,
    private editBookingService: EditBookingService,
    private route: ActivatedRoute, private location: Location,
   ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookName = this.bookingsListService.getName(this.id);
    this.bookingsListService.setBookingsListId(this.id);
    this.bookings = this.bookingsTableService.getBookings(this.id);
  }

  displayDate(dateString: string){
    let date = new Date(dateString);
    return date.getDate()+"."+(date.getMonth() + 1 + "." + date.getFullYear())
  }

  getBookings(): void {
      this.bookings = this.bookingsTableService.getBookings(this.id);
  }

  editBooking(id: number): void{
    this.editBookingService.setCurrentId(id);
    this.editBookingService.openDialog();
  }

  deleteBooking(id: number): void {
    let index = this.bookingsTableService.deleteBooking(id);
    let table = this.document.getElementById('bookingsTable') as HTMLTableElement;
    table.deleteRow(index + 1);
  }

  sortTableByDate(): void{
    if (this.sorter == "date"){
      this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.sorter = "";
    }else{
      this.sorter = "date";
      this.bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

  sortBookingsByAmount(): void {
    if (this.sorter == "amount"){
      this.bookings.sort((a, b) => b.amount - a.amount);
      this.sorter = "";
    }else{
      this.sorter = "amount";
      this.bookings.sort((a, b) => a.amount - b.amount);

    }
  }
}
