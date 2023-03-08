import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { SearchComponent } from "./components/search/search.component";
import { HomeComponent } from "./components/home/home.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PlayerComponent } from "./components/player/player.component";
import { HttpErrorInterceptor } from "./utils/http-error.interceptor";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { DummyComponent } from "./components/dummy/dummy.component";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { PlaylistSheetComponent } from "./components/playlist-sheet/playlist-sheet.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    PlaylistsComponent,
    SettingsComponent,
    PlayerComponent,
    ListItemComponent,
    DummyComponent,
    PlaylistSheetComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
