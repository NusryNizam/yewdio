import { Component } from '@angular/core';
import AudioInterface from 'src/app/interfaces/audio.interface';
import { QueueService } from 'src/app/services/queue.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})

export class PlaylistsComponent {

  playlists: Array<{name: string, data: AudioInterface[]}> = []

  constructor(private storageService: StorageService, private queueService: QueueService) {
    this.playlists = this.storageService.getAllPlaylists()
  }

  addToQueue(playlistName: string) {
    this.queueService.setQueue(playlistName)
  }
}
