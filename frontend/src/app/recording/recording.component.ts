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
  repository: File[] = [];
  treeControl = new NestedTreeControl<File>(node => node.subfolders);
  dataSource = new MatTreeNestedDataSource<File>();

  currentTime = 0;
  response: HighlightAutoResult | undefined;
  title = '';
  code = `
  `;
  url: string = '';
  currentTheme: string = themeGithub;
  logs: Timestamp[] = [];
  prevIndex = 0;
  currentCommit: Timestamp = new Timestamp();
  currentFile: string = ''
  updatedFile: string[] =[]
  constructor(private hljsLoader: HighlightLoader, private recordingService: RecordingService, private route: ActivatedRoute) {
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
    this.url = this.route.snapshot.paramMap.get('file') || ''
    this.recordingService.getRecording(this.url).subscribe((data: Recording) => {
      this.logs = data.timestamps;
      this.title = data.title;
      this.repository = data.filetree;
      this.dataSource.data = this.repository;
      // this.currentFile = this.repository[0].name;
      this.currentFile = this.getFirstFile(this.repository) || null
    })

    // a = this.route.snapshot.paramMap.get('bank');
  }

  getFirstFile(filetree: File[]): any {
    for (let file of filetree) {

      if ((file.subfolders != null && file.subfolders.length == 0) || file.subfolders == null) {
        return file.name;
      }
      else {
        let temp: File = this.getFirstFile(file.subfolders);
        if (temp != null) {
          return temp.name;
        }
      }

      return null;
    }
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
      // this.recordingService.getDiffFile()
      this.recordingService.getFileWithCommitID(this.url, this.currentFile, this.logs[nearestCommitIndex].commitHash).subscribe(data => {
        this.code = data.result;
        this.updatedFile = data.updatedFile
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

  getAncestors(array: any, name: string) {
    if (typeof array != "undefined") {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return [array[i]];
        }
        const a: any = this.getAncestors(array[i].subfolders, name);
        if (a !== null) {
          a.unshift(array[i]);
          return a;
        }
      }
    }
    return null;
  }

  onLeafNodeClick(node: File): void {
    const ancestors = this.getAncestors(this.dataSource.data, node.name);
    console.log("ancestors ", ancestors);

    // this.treeControl.collapse(ancestors[0]);
    console.log("direct parent  ", ancestors[ancestors.length - 2]);
    let breadcrumbs = "";
    ancestors.forEach((ancestor: any) => {
      breadcrumbs += `${ancestor.name}/`;
    });
    breadcrumbs = breadcrumbs.slice(0, -1);
    if (breadcrumbs != this.currentFile) {
      this.currentFile = breadcrumbs
      let nearestCommitIndex: number = this.getNearestCommitIndex(this.currentTime * 1000, this.prevIndex);

      this.prevIndex = nearestCommitIndex;
      this.recordingService.getFileWithCommitID(this.url, this.currentFile, this.logs[nearestCommitIndex].commitHash).subscribe(data => {
        this.code = data.result
        this.updatedFile = data.updatedFile
      })
    }
  }
}
