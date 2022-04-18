import { Component, OnInit } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { RecordingService } from '../_services/recording.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { File } from '../_models/filetree';
import { Recording } from '../_models/recording';
import { Timestamp } from '../_models/timestamp';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';



@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.css']
})
export class RecordingComponent implements OnInit {
  repository: File[]=[];
  treeControl = new NestedTreeControl<File>(node => node.subfolders);
  dataSource = new MatTreeNestedDataSource<File>();

  currentTime = 0;
  response: HighlightAutoResult | undefined;
  title = '';
  code = `
  `;
  currentTheme: string = themeGithub;
  logs: Timestamp[] = [];
  prevIndex = 0;
  currentCommit:Timestamp=new Timestamp();
  constructor(private hljsLoader: HighlightLoader, private recordingService: RecordingService, private route:ActivatedRoute) {
    this.dataSource.data = this.repository;
  }

  async ngOnInit() {
    // this.recordingService.getRepoTimestamp("asd").subscribe((logs) => {
    //   this.logs = logs
    // })
    // this.recordingService.getRepoFilesTree("as").subscribe((data)=>{
    //   this.repository = data
    //   this.dataSource.data = this.repository;
    // })
    // console.log("hi")
    let url:string = this.route.snapshot.paramMap.get('file') || ''
    this.recordingService.getRecording(url).subscribe((data:Recording)=>{
      this.logs = data.timestamps;
      this.title = data.title;
      this.repository = data.filetree;
      this.dataSource.data = this.repository;
    })

    // a = this.route.snapshot.paramMap.get('bank');
  }

  hasChild = (_: number, node: File) => !!node.subfolders && node.subfolders.length > 0;

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  changeTheme() {
    this.currentTheme = this.currentTheme === themeGithub ? themeAndroidStudio : themeGithub;
    this.hljsLoader.setTheme(this.currentTheme);
  }

  onTimeUpdate(event: CustomEvent<number>) {
    this.currentTime = event.detail;
    let nearestCommitIndex: number = this.getNearestCommitIndex(this.currentTime * 1000, this.prevIndex);
    if (nearestCommitIndex != this.prevIndex) {
      this.prevIndex = nearestCommitIndex;
      this.recordingService.getFileWithCommitID("daf", "tutorial.js", this.logs[nearestCommitIndex].commitHash).subscribe(data => {
        this.code = data
      })
    }
  }

  getNearestCommitIndex(timestamp: number, prevIndex: number) {
    for (let i = 0; i < this.logs.length; i++) {
      if (this.logs[i].timestamp > timestamp) {
        return Math.min(Math.max(i - 1, 0), this.logs.length - 1);
      }
    }
    return this.logs.length - 1;
  }

  test(event:any){
    console.log(event)
    // fetch the file clicked at the right timestamp
    // this.recordingService.getFileWithCommitID("daf", "tutorial.js", this.logs[nearestCommitIndex].commitHash).subscribe(data => {
    //   this.code = data
    // })
  }
}
