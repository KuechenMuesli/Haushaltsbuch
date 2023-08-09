import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  addedTag!: string;

  constructor(private localStorageService: LocalStorageService) { }

  getTags(): Observable<string[]>{
    return this.localStorageService.getDataObservable("Tags", [])
      .pipe(
        map(tags => {
            return tags;
          }
        )
      );
  }

  addTag(name: string){
    let tags: string[] = [];
    this.getTags().subscribe(tagsList => tags = tagsList);

    let index = tags.findIndex(tagName => tagName === name);
    if(index == -1){
      tags.push(name);
      this.localStorageService.saveData("Tags", tags);
    }
    this.addedTag = name;
  }
}
