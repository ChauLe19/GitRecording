import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.css']
})
export class TutorialCardComponent implements OnInit {
  @Input() isFavorited: boolean = false;
  @Input() card: any;
  constructor(private userService:UserService) {
  }
  
  ngOnInit(): void {

  }

  addToFavorites(){
      this.isFavorited = true;
      this.userService.addFavorite(this.card).subscribe(()=>{})  
  }
  
  removeFromFavorites(){
    this.isFavorited = false;
    this.userService.deleteFavorite(this.card).subscribe(()=>{})
    // console.log(this.isFavorited)
  }

}
