import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Md5 } from 'ts-md5';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../../book';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: string[] = []
  currentUser: string = this.getLoggedInUser();
  public loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
  }

  getLoggedInUser(): string{
    let user: string = "";
    this.localStorageService.getSessionStorage("LoggedIn", []).subscribe(loggedInUsers => user = loggedInUsers[0])
    return user;
  }

  getUsers(){
    this.users = this.localStorageService.getAllKeys();
  }
  
  addUser(name: string, password: string){
    this.users.push(name);

    this.localStorageService.saveData(name, []);
    interface userPassword {
      username: string,
      password: string
    }
    let passwordList: userPassword[] = [];
    this.localStorageService.getDataObservable("Passwords", []).subscribe(passwords => passwordList = passwords);
    passwordList.push({username:name, password:Md5.hashStr(password)});
    this.localStorageService.saveData("Passwords", passwordList);
  }

  userExists(username: string): boolean{
    if (this.users.findIndex(user => user == username) == -1){
      return false; 
    }
    return true;
  }

  deleteUser(name: string){
    this.localStorageService.deleteData(name);
    this.users.splice(this.users.findIndex(user => user == name), 1);
    interface userPassword{
      username: string,
      password: string
    }
    let passwordList: userPassword[] = [];
    this.localStorageService.getDataObservable("Passwords", []).subscribe(passwords => passwordList = passwords);
    let userIndex = passwordList.findIndex(pair => pair.username == name);
    passwordList.splice(userIndex, 1);
    this.localStorageService.saveData("Passwords", passwordList);
    this.logOut();
    this.getUsers();
  }

  editUser(oldName: string, newName: string){
    let userData: Book[] = []
    this.localStorageService.getDataObservable(oldName, []).subscribe(returnedData => userData = returnedData);
    this.localStorageService.deleteData(oldName);
    this.localStorageService.saveData(newName, userData);

    interface userPassword{
      username: string,
      password: string
    }
    let passwordList: userPassword[] = [];
    this.localStorageService.getDataObservable("Passwords", []).subscribe(passwords => passwordList = passwords);
    let userIndex = passwordList.findIndex(pair => pair.username == oldName);
    passwordList[userIndex] = {username:newName, password:passwordList[userIndex].password};
    this.localStorageService.saveData("Passwords", passwordList);
    this.getUsers();
    this.currentUser = newName;
  }

  checkPassword(username: string, password: string): boolean{
    interface userPassword {
      username: string,
      password: string
    }
    let passwordList: userPassword[] = [];
    this.localStorageService.getDataObservable("Passwords", []).subscribe(passwords => passwordList = passwords);
    let userIndex = passwordList.findIndex(pair => pair.username == username);
    if(userIndex !== -1){
      if (passwordList[userIndex].password == Md5.hashStr(password)){
        return true;
      }
    }
    return false;
  }

  changePassword(username: string, password: string){
    interface userPassword {
      username: string,
      password: string
    }
    let passwordList: userPassword[] = [];
    this.localStorageService.getDataObservable("Passwords", []).subscribe(passwords => passwordList = passwords);
    let userIndex = passwordList.findIndex(pair => pair.username == username);
    passwordList[userIndex].password = Md5.hashStr(password);
    this.localStorageService.saveData("Passwords", passwordList);
  }

  logIn(){
    this.loggedInSubject.next(true);
  }
  logOut(){
    this.localStorageService.writeSessionStorage("LoggedIn", []);
    this.loggedInSubject.next(false);
  }
}
