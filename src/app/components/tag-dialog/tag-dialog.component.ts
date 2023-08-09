import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsService } from '../../services/tags-service/tags.service';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css']
})
export class TagDialogComponent implements OnInit, OnChanges{
  addTagForm: FormGroup;
  name: string = "";
  tagsList: string[] = this.tagsService.getTags();

  @Input() openDialog: boolean = false;
  @Input() openFilterTagDialog = false;
  filterTags: boolean = false;
  @Output() filterTagsDialogOpen = new EventEmitter<boolean>();
  @Output() dialogIsOpen = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
  private tagsService: TagsService){
    this.addTagForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.openDialog){
      this.tagsList = this.tagsService.getTags();
      this.name = "";
      this.showDialog();
    }
    if(this.openFilterTagDialog){
      this.filterTags = true;
      this.tagsList = this.tagsService.getTags();
      this.name = "";
      this.showDialog();
    }
  }

  ngOnInit(): void {
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
    (this.document.getElementById("name") as HTMLInputElement).value = "";
    let dia = this.document.getElementById("tag-dialog") as HTMLDialogElement;
    dia.close();
  }
}
