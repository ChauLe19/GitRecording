import { Component, OnInit } from '@angular/core';
import { TutorialCardComponent } from '../tutorial-card/tutorial-card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  cards:any[] = [{},{},{}]
  constructor() { }

  ngOnInit(): void {
  }

}
