import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFilterDialogComponent } from './tags-filter-dialog.component';

describe('TagsFilterDialogComponent', () => {
  let component: TagsFilterDialogComponent;
  let fixture: ComponentFixture<TagsFilterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsFilterDialogComponent]
    });
    fixture = TestBed.createComponent(TagsFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
