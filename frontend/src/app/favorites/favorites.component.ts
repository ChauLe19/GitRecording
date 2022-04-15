import { Component, OnInit } from '@angular/core';
import { TutorialCardComponent } from '../tutorial-card/tutorial-card.component';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  tutorial_cards: any[] = [
  ];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getFavoriteTutorials().subscribe(data=>{
      this.tutorial_cards = data;
      console.log(data)
    })
  }

}
