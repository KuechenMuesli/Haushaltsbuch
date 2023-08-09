import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsService } from '../../services/tags-service/tags.service';

@Component({
  selector: 'app-tags-filter-dialog',
  templateUrl: './tags-filter-dialog.component.html',
  styleUrls: ['./tags-filter-dialog.component.css']
})
export class TagsFilterDialogComponent implements OnInit, OnChanges{
  addTagForm: FormGroup;
  name: string = "";
  tagsList: string[] = [];

  @Input() openFilterDialog: boolean = false;
  @Output() filterTagsDialogOpen = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
  private tagsService: TagsService){
    this.addTagForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.openFilterDialog){
      this.tagsService.getTags().subscribe(tags => this.tagsList = tags);
      this.name = "";
      this.showDialog();
    }
  }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(tags => this.tagsList = tags);
    this.createAddTagForm();
  }

  createAddTagForm(){

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
    let dia = this.document.getElementById("filter-tag-dialog") as HTMLDialogElement;
    dia.show();
  }

  closeDialog(){
    this.filterTagsDialogOpen.emit(false);
    let dia = this.document.getElementById("filter-tag-dialog") as HTMLDialogElement;
    (this.document.getElementById("name-input") as HTMLInputElement).value = "";
    dia.close();
  }
}
