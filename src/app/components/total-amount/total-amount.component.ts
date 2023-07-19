import { Component } from '@angular/core';
import { TotalAmountService } from '../../services/total-amount-service/total-amount.service';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';


@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})

export class TotalAmountComponent implements AfterContentChecked{
  total_amount: number = 0;
  
  constructor(private totalAmountService: TotalAmountService,
    private changeDetectorRef: ChangeDetectorRef){}
    
  ngOnInit(): void {
    this.calculateTotal();
  }

  ngAfterContentChecked(): void {
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalAmountService.calculate_total();
    this.total_amount = this.totalAmountService.total_amount;
  }


}
