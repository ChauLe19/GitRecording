import { Component, OnInit } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { RecordingService } from '../_services/recording.service';

const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.css']
})
export class RecordingComponent implements OnInit {


  response: HighlightAutoResult | undefined;
  title = 'SyntaxHighlightDemo';
  code = `
  `;
  currentTheme: string = themeGithub;

  constructor(private hljsLoader: HighlightLoader, private recordingService: RecordingService) { }

  async ngOnInit() {
    let tempcode = `
    myFunction();
    function myFunction() {
      console.log("hello world");
    }`
    this.code = tempcode;
    // for(let i = 0; i < tempcode.length; i++){
    //   await setTimeout(()=>{
    //     this.code+= tempcode[i];

    //   },i*200)
    // })
    this.recordingService.getRepoTimestamp("asd").subscribe((logs) => {
      // this.code = JSON.stringify(data);
      // console.log(data)
      console.log(logs)
      for (let log of logs) {
        console.log(log)
        this.recordingService.getFileWithCommitID("daf","tutorial.js",log.commitHash).subscribe(data=>{
          setTimeout(()=>{
            // console.log(data)
            this.code = data
          }, log.timestamp)
        })
      }
    })

  }

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

}
