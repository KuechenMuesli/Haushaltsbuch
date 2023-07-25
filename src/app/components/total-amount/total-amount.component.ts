import { Component } from '@angular/core';
import { TotalAmountService } from '../../services/total-amount-service/total-amount.service';
import { AfterContentChecked } from '@angular/core';
import { BookingsListService } from '../../services/bookings-list-service/bookings-list.service';


@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})

export class TotalAmountComponent implements AfterContentChecked{
  total_amount: number = 0;
  
  constructor(private totalAmountService: TotalAmountService, private bookingsListSerivce: BookingsListService){}
    
  ngOnInit(): void {
    this.calculateTotal();
  }

  ngAfterContentChecked(): void {
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalAmountService.calculate_total(this.bookingsListSerivce.bookingsListId);
    this.total_amount = this.totalAmountService.total_amount;
  }
}
