import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {

  constructor(private http: HttpClient) { }

  getCommit(): Observable<String> {
    // TODO: this is a blueprint only
    return this.http.get<String>(`http://localhost:3000/recordings/checkout/gitID/commitID`);
  }

  getRepoTimestamp(repo: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/timestamp/${repo}`);
  }

  getFileWithCommitID(repo:String, file:String, commitHash:String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/checkout/${repo}/${file}/${commitHash}`);
  }

}
