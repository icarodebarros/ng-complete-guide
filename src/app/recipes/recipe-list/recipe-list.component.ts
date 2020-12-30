import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output()
  public recipeWasSelected = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simple test', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_1280.jpg'),
    new Recipe('Another Test Recipe', 'This is a simple test', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_1280.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
