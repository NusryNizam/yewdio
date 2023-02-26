import { Component, OnInit } from '@angular/core';
import AudioInterface from 'src/app/interfaces/audio.interface';
import DetailedAudioInterface from 'src/app/interfaces/detailed-audio.interface';
import SelectedAudioInterface from 'src/app/interfaces/selected-audio.interface';
import { DataService } from 'src/app/services/data.service';
import { QueueService } from 'src/app/services/queue.service';
import { StorageService } from 'src/app/services/storage.service';
// import { DataService } from 'src/app/services/data.service';
// import { QueueService } from 'src/app/services/queue.service';
// import { StoreService } from 'src/app/services/store.service';

interface RecentsInterface {
  title: string, 
  author: string,
  length: number,
  albumArt: string,
  videoId: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  recents: RecentsInterface[] = [];
  playlists: Array<{name: string, data: AudioInterface[]}> = []

  constructor(private storageService: StorageService,
    private queueService: QueueService,
    private dataService: DataService,
    ) {
    // this.recents = this.store.recents
    // console.log(this.recents)
    this.playlists = this.storageService.getAllPlaylists()
    this.recents = this.storageService.getRecents()
    console.log(this.recents);
    
  }

  ngOnInit(): void {
    
  }

  getVideoDetails(videoId: string) {
    this.queueService.removeQueue()
    this.queueService.resetQueuePos()
    // this.dataService.getVideoDetails(videoId)
    this.dataService.getVideoDetails(videoId).subscribe(result => {
      this.queueService.setAudio(result)
    })
  }

  // playAudio(data: DetailedAudioInterface) {
    // this.queue.setNowPlaying = data.adaptiveFormats[0].url
      
      // this.queue.setSelectedAudio({
      //   ...data,
      //   url: data.adaptiveFormats[0].url,
      //   albumArt: data.videoThumbnails[3].url
      // })
    //     title: data.title,
    //     author: data.author,
    //     url: data.adaptiveFormats[0].url,
    //     duration: data.lengthSeconds,
    //     albumArt: data.videoThumbnails[3].url
    //   })
      
    //   this.queue.play()
  // }

  // addToQueue(playlistName: string, playlistData: AudioInterface[]) {    
  //   this.queueService.setQueue(playlistName, playlistData)
  // }
}
