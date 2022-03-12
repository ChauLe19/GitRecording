import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {

  constructor(private http: HttpClient) { }

  getCommit(): Observable<String> {
    // TODO: this is a blueprint only
     return this.http.get<String>(`http://localhost:3030/recordings/checkout/gitID/commitID`);
   }
 
}
