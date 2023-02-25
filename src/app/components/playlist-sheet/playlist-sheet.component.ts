import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import AudioInterface from 'src/app/interfaces/audio.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-playlist-sheet',
  templateUrl: './playlist-sheet.component.html',
  styleUrls: ['./playlist-sheet.component.scss']
})

export class PlaylistSheetComponent {

  searchPlaylistName: string = ''
  playlists: Array<{name: string, data: AudioInterface[]}> = []
  playlistsCopy: Array<{name: string, data: AudioInterface[]}> = []

  constructor(
    private storageService: StorageService,
    private matSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public audio: AudioInterface,
  ) {

    this.playlists = this.playlistsCopy = this.storageService.getAllPlaylists()
    // console.log(this.playlists);
    
  }


  createPlaylist(){
    this.storageService.createPlaylist(this.searchPlaylistName.toLowerCase())
    this.playlists = this.playlistsCopy = this.storageService.getAllPlaylists()
  }

  addAudioToPlaylist(audio: AudioInterface, name: string) {
    console.log(`Adding "${audio.title}" to "${name}"`);
    this.storageService.addToPlaylist(name, audio)
    this.matSheet.dismiss()
  }

  filterPlaylist(key: KeyboardEvent){
    this.playlists = this.playlists.filter((playlist) => {
      return playlist.name.toLowerCase().includes(this.searchPlaylistName.toLowerCase().trim())
    })

    // Reset search filter if backspace is pressed
    if(key.code === "Backspace") {
      this.playlists = this.playlistsCopy
    }
    
  }
}
