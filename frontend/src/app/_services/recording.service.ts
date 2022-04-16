import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../_models/filetree';
@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  fileTree:File[] = [
    {
      name: 'frontend',
      subfolders: [{ name: 'index.js' }, { name: 'authorization.js' }, { name: 'package.json' }],
    },
    {
      name: 'backend',
      subfolders: [
        {
          name: 'routes',
          subfolders: [{ name: 'index.js' }, { name: 'user.router.js' }],
        },
        {
          name: 'misc',
          subfolders: [{ name: 'tutorial.js' }, { name: 'package.json' }],
        },
      ],
    },
    {
      name:'empty.js'
    }
  ];
  constructor(private http: HttpClient) { }

  getCommit(): Observable<String> {
    // TODO: this is a blueprint only
    return this.http.get<String>(`http://localhost:3000/recordings/checkout/gitID/commitID`);
  }

  getRepoTimestamp(repo: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/timestamp/${repo}`);
  }

  getFileWithCommitID(repo: String, file: String, commitHash: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/checkout/${repo}/${file}/${commitHash}`);
  }

  getAudioFile(repo: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/audio/${repo}`);
  }

  getRepoFilesTree(repo: string): Observable<File[]> {
    return new Observable<File[]>(subscriber => { 
      subscriber.next(this.fileTree)
    })

  }

}
