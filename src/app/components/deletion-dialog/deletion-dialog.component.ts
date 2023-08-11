import {Component, OnInit, Input, Output, OnChanges, EventEmitter, Inject} from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.css']
})
export class DeletionDialogComponent implements OnChanges{
  @Input() inputId: any | null = null;
  @Output() outputValue = new EventEmitter<any | null>;
  output: any = null;
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {}

  ngOnChanges(){
    console.log(this.inputId)
    if(this.inputId !== null){
      this.showDialog();
    }
  }

  showDialog(){
    let dialog = this.document.getElementById("deletion-dialog") as HTMLDialogElement;
    dialog.show();
  }

  onSubmit(){
    this.output = this.inputId;
    this.closeDialog();
  }

  onCancel(){
    this.output = null;
    this.closeDialog();
  }

  closeDialog(){
    this.outputValue.emit(this.output);
    let dialog = this.document.getElementById("deletion-dialog") as HTMLDialogElement;
    dialog.close();
  }
}
