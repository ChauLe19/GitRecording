import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../_models/tutorial';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    username: "fakeUser",
    favorites:[]
  }
  constructor(private http: HttpClient) { }
  getFavoriteTutorials(): Observable<Tutorial[]> {
    // return this.http.get<String>(`http://localhost:3000/tutorial/search?query=${query}`);
    return new Observable<Tutorial[]>(subscriber => {
      subscriber.next(this.user.favorites)
    })
  }

  addFavorite(/*url: string*/ tutorial: Tutorial): Observable<Tutorial[]> {  // parameter is supposed to be url, but we are using Tutorial for convenience
    // return this.http.get<String>(`http://localhost:3000/tutorial/search?query=${query}`);

    return new Observable<Tutorial[]>(subscriber => {
      const found = this.user.favorites?.find(elem => elem._id === tutorial._id)
      if (found) return;
      console.log(this.user.favorites)
      this.user.favorites?.push(tutorial)
      subscriber.next(this.user.favorites)
    })
  }

  deleteFavorite(/*url: string*/ tutorial: Tutorial): Observable<Tutorial[]> {  // parameter is supposed to be url, but we are using Tutorial for convenience
    // return this.http.get<String>(`http://localhost:3000/tutorial/search?query=${query}`);

    return new Observable<Tutorial[]>(subscriber => {
      this.user.favorites = this.user.favorites?.filter((elem) => elem != tutorial)
      subscriber.next(this.user.favorites)
    })
  }
}
