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
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { NgxAudioPlayerMaterialModule } from "ngx-audio-player-material";
import { VimeModule } from '@vime/angular';
import { TutorialCardComponent } from './tutorial-card/tutorial-card.component';
import { MatTreeModule } from '@angular/material/tree';
import { FavoritesComponent } from './favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { InfoComponent } from './info/info.component';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS, } from '@angular/material/form-field';
//import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordingComponent,
    TutorialCardComponent,
    FavoritesComponent,
    InfoComponent,
    SearchComponent
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
    MatTreeModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
    }
  },
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
