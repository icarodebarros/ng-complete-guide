import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './ngrx-store/app.reducer';
import { AuthEffects } from './auth/ngrx-store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/ngrx-store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RecipesModule, // This module is loading lazily on AppRouting, so it should not be imported here (Eager loading).
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ AuthEffects, RecipeEffects ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
