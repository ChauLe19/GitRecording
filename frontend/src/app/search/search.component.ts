import { Component, OnInit } from '@angular/core';
import { TutorialCardComponent } from '../tutorial-card/tutorial-card.component'
import { TutorialService } from '../_services/tutorial.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = '';
  tutorial_cards: any[] = []
  listArr: any[] = []

  constructor(private tutorialService:TutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getTutorials().subscribe(data=>{
      this.listArr = data
    })
  }

  //Search function
  searchFunc(searchKey: string) {

    this.tutorialService.searchTutorials(searchKey).subscribe((data)=>{
      this.listArr = data
    })

  }

}

