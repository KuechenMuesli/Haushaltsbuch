import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComplexComponent } from './add-booking-complex.component';

describe('AddBookingComplexComponent', () => {
  let component: AddBookingComplexComponent;
  let fixture: ComponentFixture<AddBookingComplexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookingComplexComponent]
    });
    fixture = TestBed.createComponent(AddBookingComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
