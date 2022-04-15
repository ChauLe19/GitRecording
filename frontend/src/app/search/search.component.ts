import { Component, OnInit } from '@angular/core';
import { TutorialCardComponent } from '../tutorial-card/tutorial-card.component'

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
    image: "https://www.wwt.com/api/attachments/5e6026402dab3d0093840a23/thumbnail?width=600",
    url: "cloud"
  }, {
    title: "Java Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: "https://dev.java/assets/images/java-logo-vert-blk.png",
    url: "java"
  }, {
    title: "Python Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: "https://avatars.githubusercontent.com/u/1525981?s=280&v=4",
    url: "python"
  }, {
    title: "NodeJS Tutorial",
    description: "The purpose of the tutorial is to serve as support, as well as a challenge, for individual students' knowledge acquisition, but it can also be used for training collaboration abilities.",
    image: "https://nodejs.org/static/images/logo-hexagon-card.png",
    url:"nodejs"
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

