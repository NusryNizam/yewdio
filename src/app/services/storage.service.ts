import { Injectable } from '@angular/core';
import AudioInterface from '../interfaces/audio.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private notificationService: NotificationService) { }

  getAllPlaylists() {
    let playlists = []
    for (let i = 0, l = localStorage.length; i < l; i++) {
      let playlistName: string = localStorage.key(i) as string
      let playlistValues: AudioInterface[] = JSON.parse(localStorage[playlistName as string])
      console.log(playlistValues);

      playlists.push({ name: playlistName, data: playlistValues })
    }

    // console.log(playlists)
    return playlists

    // return JSON.parse(localStorage.getItem('playlists') || '')
  }

  getPlaylist(name: string): AudioInterface[] | null {
    let playlist = localStorage.getItem(name)
    return playlist ? JSON.parse(playlist) : null
  }

  createPlaylist(name: string, data?: AudioInterface) {
    localStorage.setItem(name, data ? JSON.stringify(data) : '[]')
  }

  deletePlaylist(name: string) {
    localStorage.removeItem(name)
  }

  addToPlaylist(name: string, data: AudioInterface): boolean {
    let playlist = this.getPlaylist(name)

    if (playlist && !this.ifExists(name, data.videoId)) {
      
      localStorage.setItem(name, JSON.stringify([...playlist, data]))
      this.notificationService.notifyUser(`Successfully added to playlist '${name}'`)
      return true

    } else {

      this.notificationService.notifyUser(`Error: Song already exists in the playlist`)
      return false

    }
  }

  ifExists(name: string, videoId: string): boolean {
    let items: AudioInterface[] | null = this.getPlaylist(name)
    if (items) {
      return items.some((item) => item.videoId === videoId)
    } else {
      return false
    }
  }
}
