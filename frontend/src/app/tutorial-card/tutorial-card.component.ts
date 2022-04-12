import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.css']
})
export class TutorialCardComponent implements OnInit {
  isFavorited: boolean;
  @Input() card: any;
  constructor() {
    this.isFavorited = false
  }

  ngOnInit(): void {

  }

  addToFavorites(){
    this.isFavorited = true;
  }

  removeFromFavorites(){
    this.isFavorited = false;
    console.log(this.isFavorited)
  }

}
