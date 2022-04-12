import { Component, OnInit } from '@angular/core';
import {TutorialCardComponent} from '../tutorial-card/tutorial-card.component'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = '';
  tutorial_cards: any[] = [{
    title: "Cloud Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: ""
  }, {
    title: "Java Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: ""
  }, {
    title: "Python Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: ""
  }, {
    title: "NodeJS Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: ""
  }
];
listArr: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.listArr = this.tutorial_cards;
  }

  //Search function
    searchFunc(searchKey: string) {
      
      const searchedArr = this.tutorial_cards.filter((e: any) => {
        return e.title.toLowerCase().includes(searchKey.toLowerCase())
      })
      this.listArr = searchedArr;
      
      

    }

}

