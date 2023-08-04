import { Component, Input, Inject, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Md5 } from 'ts-md5';
import { UserService } from '../../services/user-service/user.service';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnChanges, OnInit{
  @Input() loggedIn: boolean = false;
  @Output() loginStatus= new EventEmitter<boolean>;
  loginForm!: FormGroup;
  userAlreadyExists: boolean = false;
  wrongUsernamePassword: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private userService: UserService, private localStorageService: LocalStorageService){
    this.loginForm = this.formBuilder.group({username:["", Validators.required], password:["", Validators.required]});
  }

  ngOnInit(): void {
    let loggedInUser: string = "";
    this.localStorageService.getSessionStorage("LoggedIn", []).subscribe(loggedInUsers => loggedInUser = loggedInUsers[0]); 
    if (loggedInUser.length !== 0){
      this.loggedIn = true;
      this.userService.logIn();
      this.userService.currentUser = loggedInUser[0];
      this.closeDialog();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.loggedIn){
      this.loginForm.value.username = "";
      this.loginForm.value.password = "";
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
    this.localStorageService.writeSessionStorage("LoggedIn", [username]);
    this.userService.currentUser = username;
    this.userAlreadyExists = false;
    this.wrongUsernamePassword = false;
    this.closeDialog();
  }else{
    this.userAlreadyExists = false;
    this.wrongUsernamePassword = true;
  }
  }
  
  closeDialog(){
    let dialog = this.document.getElementById("login-dialog") as HTMLDialogElement;
    (this.document.getElementById("username-input") as HTMLInputElement).value = "";
    (this.document.getElementById("password-input") as HTMLInputElement).value = "";

    dialog.close();
    this.loginStatus.emit(this.loggedIn);
  }

  addNewUserClicked(){
    let data = this.loginForm.value;
    if (this.loginForm.valid){
      if (!this.userService.userExists(data.username)){
        this.userService.addUser(data.username, data.password);
        this.userService.currentUser = data.username;
        this.localStorageService.writeSessionStorage("LoggedIn", [data.username]);
        this.loggedIn = true;
        this.userAlreadyExists = false;
        this.wrongUsernamePassword = false;
        this.closeDialog();
      }else{
        this.wrongUsernamePassword = false;
        this.userAlreadyExists = true;
      }
    }
  }
}
