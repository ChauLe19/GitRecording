import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../_models/tutorial';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
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
    url: "nodejs"
  }
  ];
  constructor(private http: HttpClient) { }

  getTutorials(): Observable<Tutorial[]> { // get all tutorials
    // TODO: this is a blueprint only
    // return this.http.get<String>(`http://localhost:3000/tutorial/search`);
    // return new Observable<Tutorial[]>(subscriber => {
    //   if (this.tutorial_cards.length > 0) {
    //     setTimeout(() => {
   //       subscriber.next(this.tutorial_cards);
    //     }, 1000);
    //   } else {
    //     setTimeout(() => {
    //       subscriber.error('No tutorials in the DB.');
    //     }, 1000); 
    //   }

    // });
    return this.http.get<Tutorial[]>(`http://localhost:3000/recordings/getall`);
  }

  searchTutorials(query: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`http://localhost:3000/recordings/search?query=${query}`);
    
  }

  
}
