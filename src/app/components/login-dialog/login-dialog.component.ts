import { Component, Input, Inject, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Md5 } from 'ts-md5';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnChanges, OnInit{
  @Input() loggedIn: boolean = false;
  @Output() loginStatus= new EventEmitter<boolean>;
  loginForm!: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private userService: UserService){
    this.loginForm = this.formBuilder.group({username:["", Validators.required], password:["", Validators.required]});
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.loggedIn){
      this.showDialog();
    }
  }
  showDialog(){
    let dialog = this.document.getElementById("login-dialog") as HTMLDialogElement;
    dialog.show();
  }

  onSubmit(){
  let username = this.loginForm.value.username;
  let password = this.loginForm.value.password;
  if(this.userService.checkPassword(username, password)){
    this.loggedIn = true;
    this.closeDialog();
  }
  }
  
  closeDialog(){
    let dialog = this.document.getElementById("login-dialog") as HTMLDialogElement;
    dialog.close();
    this.loginStatus.emit(this.loggedIn);
  }

  addNewUserClicked(){
    let data = this.loginForm.value;
    if (!this.userService.userExists(data.username)){
      this.userService.addUser(data.username, data.password);
      this.userService.currentUser = data.username;
      this.loggedIn = true;
      this.closeDialog();
    }
    
  }
}
