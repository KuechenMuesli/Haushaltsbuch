import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookingDialogComponent } from './add-edit-booking-dialog.component';

describe('AddEditBookingDialogComponent', () => {
  let component: AddEditBookingDialogComponent;
  let fixture: ComponentFixture<AddEditBookingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBookingDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
