import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  addedTag!: string;

  constructor(private localStorageService: LocalStorageService) {
  }

  getTags(): Observable<string[]> {
    return this.localStorageService.getData("Tags", [])
      .pipe(
        map(tags => {
            return tags;
          }
        )
      );
  }

  addTag(name: string): Observable<void> {
    return this.getTags()
      .pipe(
        map(tags => {
          let index = tags.findIndex(tagName => tagName == name);
          if (index == -1) {
            tags.push(name);
          }
          this.addedTag = name;
          return {tags: tags}
        })
      )
      .pipe(tap(tags => {
        this.localStorageService.saveData("Tags", tags.tags);
      }))
      .pipe(map(() => {
        return;
      }))
  }
}
