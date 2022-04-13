import { Component, OnInit } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { RecordingService } from '../_services/recording.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.css']
})
export class RecordingComponent implements OnInit {

    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  currentTime = 0;
  response: HighlightAutoResult | undefined;
  title = 'SyntaxHighlightDemo';
  code = `
  `;
  currentTheme: string = themeGithub;
  logs: any[] = [];
  prevIndex = 0;
  currentCommit = {};
  constructor(private hljsLoader: HighlightLoader, private recordingService: RecordingService) { 
    this.dataSource.data = TREE_DATA;
  }

  async ngOnInit() {
    let tempcode = ``
    this.code = tempcode;
    // for(let i = 0; i < tempcode.length; i++){
    //   await setTimeout(()=>{
    //     this.code+= tempcode[i];

    //   },i*200)
    // })
    // this.recordingService.getAudioFile("JSTutorial").subscribe((audio)=>{

    // })
    this.recordingService.getRepoTimestamp("asd").subscribe((logs) => {
      // this.code = JSON.stringify(data);
      // console.log(data)
      // console.log(logs)
      // for (let log of logs) {
      //   console.log(log)
      //   this.recordingService.getFileWithCommitID("daf","tutorial.js",log.commitHash).subscribe(data=>{
      //     setTimeout(()=>{
      //       // console.log(data)
      //       this.code = data
      //     }, log.timestamp)
      //   })
      // }
      this.logs = logs
    })

  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

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

}
