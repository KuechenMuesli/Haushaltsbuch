import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData<Type>(key: string, value:Type){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(key: string, defaultValue: T): Observable<T> {
    return new Observable(observer => {
      const storageString = localStorage.getItem(key);
      const data: T = storageString !== null? JSON.parse(storageString) : defaultValue;
      observer.next(data);
      observer.complete();
    });
  }

  deleteData(key: string){
    localStorage.removeItem(key);
  }

  getAllKeys(): string[]{
    let keys: string[] = Object.keys(localStorage);
    let excludedKeys: string[] = ["Tags", "Passwords"];
    for(let excludedKey of excludedKeys){
      keys.splice(keys.findIndex(key => key == excludedKey), 1);
    }
    return keys;
  }

  getSessionStorage <T>(key: string, defaultValue: T): Observable<T>{
    return new Observable(observer => {
      const storageString = sessionStorage.getItem(key);
      const data: T = storageString !== null ? JSON.parse(storageString) : defaultValue;
      observer.next(data);
      observer.complete();
    })
  }

  writeSessionStorage <Type>(key: string, value:Type){
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
