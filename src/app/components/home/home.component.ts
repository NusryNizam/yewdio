import { Component, OnInit } from '@angular/core';
import DetailedAudioInterface from 'src/app/interfaces/detailed-audio.interface';
import SelectedAudioInterface from 'src/app/interfaces/selected-audio.interface';
// import { DataService } from 'src/app/services/data.service';
// import { QueueService } from 'src/app/services/queue.service';
// import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  recents: SelectedAudioInterface[] = [];

  constructor() {
    // this.recents = this.store.recents
    // console.log(this.recents)
    
  }

  ngOnInit(): void {
    
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
}
