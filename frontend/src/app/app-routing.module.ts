import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { RecordingComponent } from './recording/recording.component';

const routes: Routes = [{ path: 'test', component: RecordingComponent }, { path: 'favorites', component: FavoritesComponent }, 
{ path: '', component: HomeComponent },
 { path: '*', component: AppComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
