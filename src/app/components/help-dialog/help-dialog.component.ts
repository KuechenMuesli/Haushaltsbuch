import {Component, Input, OnChanges, Inject, SimpleChanges} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnChanges{
  @Input() helpDialogOpen = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.helpDialogOpen){
      this.openDialog();
    }else{
      this.closeDialog();
    }
  }

  openDialog(){
    let dialog = this.document.getElementById("help-dialog") as HTMLDialogElement;
    dialog.show();
  }

  closeDialog(){
    let dialog = this.document.getElementById("help-dialog") as HTMLDialogElement;
    dialog.close();
  }
}
