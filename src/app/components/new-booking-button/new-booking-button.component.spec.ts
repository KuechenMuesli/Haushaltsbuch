import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingButtonComponent } from './new-booking-button.component';

describe('AddBookingComplexComponent', () => {
  let component: NewBookingButtonComponent;
  let fixture: ComponentFixture<NewBookingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookingButtonComponent]
    });
    fixture = TestBed.createComponent(NewBookingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
