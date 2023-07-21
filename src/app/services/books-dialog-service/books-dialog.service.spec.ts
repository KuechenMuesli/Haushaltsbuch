import { TestBed } from '@angular/core/testing';

import { BooksDialogService } from './books-dialog.service';

describe('BooksDialogService', () => {
  let service: BooksDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
