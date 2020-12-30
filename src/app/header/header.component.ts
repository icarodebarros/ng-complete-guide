import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export type Feature = 'recipe' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  public featureSelected = new EventEmitter<Feature>();
  
  public collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: Feature) {
    this.featureSelected.emit(feature);
  }

}
