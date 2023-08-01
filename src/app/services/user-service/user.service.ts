import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: string[] = []
  currentUser!: string;
  constructor(private localStorageService: LocalStorageService) { }

  getUsers(){
    this.users = this.localStorageService.getAllKeys();
  }
  
  addUser(name: string){
    this.users.push(name);
    this.localStorageService.saveData(name, []);
  }

  deleteUser(name: string){
    this.localStorageService.deleteData(name);
    delete this.users[this.users.findIndex(user => user == name)];
    this.getUsers();
    this.currentUser = this.users[0];
  }

  editUser(oldName: string, newName: string){
    let userData = this.localStorageService.getData(oldName);
    this.localStorageService.deleteData(oldName);
    this.localStorageService.saveData(newName, userData);
    this.getUsers();
    this.currentUser = newName;
  }

  checkPassword(username: string, password: string){
    console.log(Md5.hashStr(password));
    return password == "test";
  }
}
