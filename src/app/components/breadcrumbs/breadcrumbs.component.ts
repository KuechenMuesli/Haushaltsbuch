import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from "../../breadcrumb";
import {BooksService} from "../../services/books-service/books.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit{

  breadcrumbs: Breadcrumb[] = [
    {name:"main menu", path:"/main-menu"},
    {name:"Table", path:`/table/${this.booksService.bookId}`},
    {name:"Dashboard", path:`/table/${this.booksService.bookId}/dashboard`}
  ];

  currentBreadcrumbs: Breadcrumb[] = [];
  path: string = "";

  constructor(private booksService: BooksService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(){
    this.path = this.router.url;
    if (this.path.endsWith("main-menu")){
      this.currentBreadcrumbs = [this.breadcrumbs[0]];
    } else if (this.path.endsWith(`/table/${this.booksService.bookId}`)){
      this.currentBreadcrumbs = [this.breadcrumbs[0], this.breadcrumbs[1]];
    } else if (this.path.endsWith("dashboard")){
      this.currentBreadcrumbs = this.breadcrumbs;
    }
  }


}
