import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

export type Feature = 'recipe' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public isAuthenticated = false;
  public collapsed = true;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
      this.userSub = this.authService.loggedUser
        .subscribe(user => {
          this.isAuthenticated = !!user;
        })
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

}
