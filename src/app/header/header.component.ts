import { Component, OnInit } from '@angular/core';

export type Feature = 'recipe' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
