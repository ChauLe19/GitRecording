import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../_models/filetree';
import { Recording } from '../_models/recording';
import { Timestamp } from '../_models/timestamp';
@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  fileTree: File[] = [
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
      name: 'empty.js'
    }
  ];
  timestamps: Timestamp[] = [
    { order: 0, commitHash: '2bde2ac', timestamp: 6681 },
    { order: 1, commitHash: 'f27d2f6', timestamp: 9434 },
    { order: 2, commitHash: 'ebd3c96', timestamp: 12683 },
    { order: 3, commitHash: '844bf3d', timestamp: 13609 },
    { order: 4, commitHash: '1997e61', timestamp: 13988 },
    { order: 5, commitHash: '3e7d6b8', timestamp: 17596 },
    { order: 6, commitHash: '5491616', timestamp: 18604 },
    { order: 7, commitHash: 'eae4ee8', timestamp: 20589 },
    { order: 8, commitHash: 'f14ce15', timestamp: 22895 },
    { order: 9, commitHash: 'efb2c81', timestamp: 24238 },
    { order: 10, commitHash: 'b454b23', timestamp: 25709 },
    { order: 11, commitHash: '5ea0c46', timestamp: 26004 },
    { order: 12, commitHash: 'ef82083', timestamp: 27642 },
    { order: 13, commitHash: 'f92f1a3', timestamp: 28543 },
    { order: 14, commitHash: 'e072d05', timestamp: 31197 },
    { order: 15, commitHash: 'ffe5660', timestamp: 33267 },
    { order: 16, commitHash: '09818ac', timestamp: 35430 },
    { order: 17, commitHash: '3867ef3', timestamp: 36130 },
    { order: 18, commitHash: '913118f', timestamp: 38185 }
  ];
  // recording: Recording = { title: "JSTutorial", filetree: this.fileTree, timestamps: this.timestamps }

  recordings: Recording[] = [{ title: "Javascript Tutorial: function", filetree: this.fileTree, timestamps: this.timestamps, url: "nodejs", audioURL: `http://localhost:3000/recordings/audio/js` },
  { title: "Cloud Tutorial: expressJS", filetree: [{name:"index.js"}], timestamps: this.timestamps, audioURL: "http://localhost:3000/recordings/audio/cloud", url: "cloud" },
  { title: "Python: Hello world", filetree: [{name:"index.py"}], timestamps: this.timestamps, audioURL: "http://localhost:3000/recordings/audio/cloud", url: "python" },
  { title: "Java: Hello World", filetree: [{name:"main.java"}], timestamps: this.timestamps, audioURL: "http://localhost:3000/recordings/audio/cloud", url: "java" }]
  constructor(private http: HttpClient) { }

  getCommit(): Observable<String> {
    // TODO: this is a blueprint only
    return this.http.get<String>(`http://localhost:3000/recordings/checkout/gitID/commitID`);
  }

  getRecording(recordingID: string): Observable<Recording> {
    // return new Observable<Recording>(subscriber => {
    //   subscriber.next(this.recordings.find(recording=> recording.url == recordingID))
    // })
    return this.http.get<Recording>(`http://localhost:3000/recordings/getrecording/${recordingID}`);
  }
  getRecordingTimestamp(recordingID: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/timestamp/${recordingID}`);
  }

  getFileWithCommitID(recordingID: String, file: String, commitHash: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/checkout/${recordingID}/${commitHash}?file=${file}`);
  }

  getAudioFile(recordingID: String): Observable<any> {
    return this.http.get(`http://localhost:3000/recordings/getaudio/${recordingID}`);
  }

  getRepoFilesTree(repo: string): Observable<File[]> {
    return new Observable<File[]>(subscriber => {
      subscriber.next(this.fileTree)
    })

  }

}
