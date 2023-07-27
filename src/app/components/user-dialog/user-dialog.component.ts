import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit{
  isdialogOpen: boolean = true;
  editUserForm!: FormGroup; 
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private userService: UserService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.openDialog){
      this.showDialog();
    }
  }

  ngOnInit(){
    this.newEditUserForm();
  }

  newEditUserForm(){
    this.editUserForm = this.formBuilder.group({
      name:[`${this.userService.currentUser}`, Validators.required]
    })
  }

  onSubmit(){
    let formData;
    if(this.editUserForm.valid){
      formData = this.editUserForm.value; 
      this.userService.editUser(this.userService.currentUser, formData.name);
    }
    this.closeDialog();
  }

  deleteUser(){
    this.userService.deleteUser(this.userService.currentUser);
    this.closeDialog();
  }

  cancelEditing(){
    this.closeDialog();
  }

  showDialog(){
    this.newEditUserForm();
    let dia = this.document.getElementById("user-dialog") as HTMLDialogElement;
    dia.show();
  }

  closeDialog(){
    this.dialogIsOpen.emit(false);
    let dia = this.document.getElementById("user-dialog") as HTMLDialogElement;
    dia.close();
  }
}