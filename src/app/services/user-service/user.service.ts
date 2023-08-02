import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Md5 } from 'ts-md5';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: string[] = []
  currentUser!: string;
  public loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
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
    let passwordList: userPassword[] = this.localStorageService.getData("Passwords");
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
    let passwordList: userPassword[] = this.localStorageService.getData("Passwords");
    let userIndex = passwordList.findIndex(pair => pair.username == name);
    passwordList.splice(userIndex, 1);
    this.localStorageService.saveData("Passwords", passwordList);
    this.logOut();
    this.getUsers();
  }

  editUser(oldName: string, newName: string){
    let userData = this.localStorageService.getData(oldName);
    this.localStorageService.deleteData(oldName);
    this.localStorageService.saveData(newName, userData);

    interface userPassword{
      username: string,
      password: string
    }
    let passwordList: userPassword[] = this.localStorageService.getData("Passwords");
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
    let passwordList: userPassword[] = this.localStorageService.getData("Passwords");
    let userIndex = passwordList.findIndex(pair => pair.username == username);
    if(userIndex !== -1){
      if (passwordList[userIndex].password == Md5.hashStr(password)){
        return true;
      }
    }
    return false;
  }

  logIn(){
    this.loggedInSubject.next(true);
  }
  logOut(){
    this.localStorageService.writeSessionStorage("LoggedIn", []);
    this.loggedInSubject.next(false);
  }
}
