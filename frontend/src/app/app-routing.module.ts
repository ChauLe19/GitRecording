import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { RecordingComponent } from './recording/recording.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [{ path: 'recording/:file', component: RecordingComponent }, { path: 'about', component: InfoComponent }, { path: 'favorites', component: FavoritesComponent }, 
{ path: '', component: HomeComponent },
 { path: '*', component: AppComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
