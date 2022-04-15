import { Component, OnInit } from '@angular/core';
import { TutorialCardComponent } from '../tutorial-card/tutorial-card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  tutorial_cards: any[] = [{
    title: "Java Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: "https://dev.java/assets/images/java-logo-vert-blk.png",
    url: "java"
  }, {
    title: "NodeJS Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: "https://nodejs.org/static/images/logo-hexagon-card.png",
    url: "nodejs"
  }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
