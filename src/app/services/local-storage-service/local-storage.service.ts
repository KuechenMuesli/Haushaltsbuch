import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData<Type>(key: string, value:Type){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData <Type>(key: string): Type[]{
    const data = localStorage.getItem(key);
    const array: Type[] = data !== null? JSON.parse(data) : []
    return array;
  }

  deleteData(key: string){
    localStorage.removeItem(key);
  }

  getAllKeys(): string[]{
    let keys: string[] = Object.keys(localStorage);
    keys.splice(keys.findIndex(key => key == "Tags") ,1);
    return keys;
  }
}