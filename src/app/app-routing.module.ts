import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', title: 'Home | Yewdio', component: HomeComponent},
  {path: 'search', title: 'Search', component: SearchComponent},
  {path: 'playlists', title: 'Playlists', component: PlaylistsComponent},
  {path: 'settings', title: 'Settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
