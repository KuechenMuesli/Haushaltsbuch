import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from '../../services/bookings-service/bookings.service';
import { BooksService } from '../../services/books-service/books.service';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { TagsService } from '../../services/tags-service/tags.service';

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css']
})
export class AddTagDialogComponent implements OnInit, OnChanges{
  isDialogOpen!: boolean;
  addTagForm!: FormGroup;
  name: string = "";
  tagsList: string[] = this.tagsService.getTags();

  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, 
  private bookingsService: BookingsService, private localStorageService: LocalStorageService,
  private tagsService: TagsService){
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.openDialog){
      this.tagsList = this.tagsService.getTags();
      this.name = "";
      this.showDialog();
    }
  }

  ngOnInit(): void {
    this.createAddTagForm();
  }

  createAddTagForm(){
    this.addTagForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required]
    })
  }

  onSubmit(){
    this.tagsService.addTag(this.addTagForm.value.name);
    this.closeDialog();
  }

  cancelAddingTag(){
    this.tagsService.addedTag = "";
    this.closeDialog();
  }

  showDialog(){
    this.name = "";
    let dia = this.document.getElementById("tag-dialog") as HTMLDialogElement;
    dia.show();
  }

  closeDialog(){
    this.dialogIsOpen.emit(false);
    let dia = this.document.getElementById("tag-dialog") as HTMLDialogElement;
    dia.close();
  }
}
