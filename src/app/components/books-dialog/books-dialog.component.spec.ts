import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDialogComponent } from './books-dialog.component';

describe('BooksDialogComponent', () => {
  let component: BooksDialogComponent;
  let fixture: ComponentFixture<BooksDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksDialogComponent]
    });
    fixture = TestBed.createComponent(BooksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
