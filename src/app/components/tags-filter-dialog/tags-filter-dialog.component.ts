import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
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
  addedTag: string = "";

  @Input() openFilterDialog: boolean = false;
  @Output() filterTagsDialogOpen = new EventEmitter<string | null>();

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
  private tagsService: TagsService){
    this.addTagForm = this.formBuilder.group({
      name:[`${this.name}`, Validators.required]
    })
  }

  ngOnChanges(): void{
    if(this.openFilterDialog){
      this.tagsService.getTags().subscribe(tags => this.tagsList = tags);
      this.name = "";
      this.showDialog();
    }
  }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(tags => this.tagsList = tags);
  }

  onSubmit(){
    this.addedTag = this.addTagForm.value.name;
    this.tagsService.addTag(this.addedTag).subscribe();
    this.closeDialog();
  }

  cancelAddingTag(){
    this.addedTag = "";
    this.closeDialog();
  }

  showDialog(){
    this.name = "";
    let dia = this.document.getElementById("filter-tag-dialog") as HTMLDialogElement;
    dia.show();
  }

  closeDialog(){
    if(this.addedTag == ""){
      this.filterTagsDialogOpen.emit(null);
    }else{
      this.filterTagsDialogOpen.emit(this.addedTag);
    }
    let dia = this.document.getElementById("filter-tag-dialog") as HTMLDialogElement;
    (this.document.getElementById("name-input") as HTMLInputElement).value = "";
    dia.close();
  }
}
