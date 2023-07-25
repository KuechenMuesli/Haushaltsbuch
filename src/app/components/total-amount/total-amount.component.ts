import { Component } from '@angular/core';
import { TotalAmountService } from '../../services/total-amount-service/total-amount.service';
import { AfterContentChecked } from '@angular/core';
import { BooksService } from '../../services/books-service/books.service';


@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})

export class TotalAmountComponent implements AfterContentChecked{
  total_amount: number = 0;
  
  constructor(private totalAmountService: TotalAmountService, private booksService: BooksService){}
    
  ngOnInit(): void {
    this.calculateTotal();
  }

  ngAfterContentChecked(): void {
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalAmountService.calculate_total(this.booksService.bookId);
    this.total_amount = this.totalAmountService.total_amount;
  }
}
