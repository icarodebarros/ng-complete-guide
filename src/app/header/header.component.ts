import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

export type Feature = 'recipe' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  public collapsed = true;

  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

}
