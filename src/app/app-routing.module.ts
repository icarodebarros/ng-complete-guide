import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule' }, // Lazy Loading (old sintax)
  { path: 'recipes', 
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, // Lazy Loading (new sintax)
  { path: 'shopping-list', 
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  // Emabora o lazy loading faça os módulos serem carregados apenas quando necessário, uma possível melhoria é
  // usar o 'preloadingStrategy' abaixo, que carrega os módulos restantes antes do necessário mas sem inflar o
  // bundle main.js como o Eager loading faria
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
