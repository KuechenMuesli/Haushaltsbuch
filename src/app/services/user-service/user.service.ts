import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: string[] = []
  currentUser: string = this.users[0];
  constructor(private localStorageService: LocalStorageService) { }

  getUsers(){
    this.users = this.localStorageService.getAllKeys();
  }
  
  addUser(name: string){
    this.users.push(name);
    this.localStorageService.saveData(name, []);
  }
}
