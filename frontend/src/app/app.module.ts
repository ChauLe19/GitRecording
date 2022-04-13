import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecordingComponent } from './recording/recording.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { NgxAudioPlayerMaterialModule } from "ngx-audio-player-material";
import { VimeModule } from '@vime/angular';
import { TutorialCardComponent } from './tutorial-card/tutorial-card.component';
import {MatTreeModule} from '@angular/material/tree'; 
import {MatCardModule} from '@angular/material/card';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordingComponent,
    TutorialCardComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighlightModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxAudioPlayerMaterialModule,
    VimeModule,
    MatCardModule,
    MatTreeModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
    }
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
