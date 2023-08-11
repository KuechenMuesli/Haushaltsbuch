import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit, OnChanges{
  isdialogOpen: boolean = true;
  editUserForm!: FormGroup;
  @Input() openDialog!: boolean;
  @Output() dialogIsOpen = new EventEmitter<boolean>();
  changePassword: boolean = false;
  incorrectPassword: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private userService: UserService){}

  ngOnChanges(): void {
    if(this.openDialog){
      this.showDialog();
    }
  }

  ngOnInit(){
    this.newEditUserForm();
  }

  newEditUserForm(){
    let user: string = "";
    this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
    this.editUserForm = this.formBuilder.group({
      name:[`${user}`, Validators.required],
      oldPassword:[],
      newPassword:[]
    })
  }

  onSubmit(){
    let formData;
    if(this.editUserForm.valid){
      formData = this.editUserForm.value;
      let user: string = "";
      this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
      this.userService.editUser(user, formData.name);
    }
    if(this.changePassword){
      let user: string = "";
      this.userService.getLoggedInUser().subscribe(returnedUser => user = returnedUser);
      if(this.userService.checkPassword(user, formData.oldPassword)){
        this.userService.changePassword(user, formData.newPassword);
        this.incorrectPassword = false;
      }else{
        this.incorrectPassword = true;
      }
    }
    if(!this.incorrectPassword){
      this.closeDialog();
    }
  }

  changePasswordClicked(){
    this.changePassword = !this.changePassword;
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
