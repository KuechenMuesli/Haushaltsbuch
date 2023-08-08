import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tags!: string[];
  addedTag!: string;

  constructor(private localStorageService: LocalStorageService) { }

  getTags(){
    this.localStorageService.getDataObservable("Tags", []).subscribe(tagsList => this.tags = tagsList);
    return this.tags
  }

  addTag(name: string){
    let tags: string[] = this.getTags();

    let index = tags.findIndex(tagName => tagName === name);
    if(index == -1){
      tags.push(name);
      this.localStorageService.saveData("Tags", tags);
    }
    this.addedTag = name;
  }
}
