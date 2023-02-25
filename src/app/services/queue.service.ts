import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import AudioInterface from '../interfaces/audio.interface';
import DetailedAudioInterface from '../interfaces/detailed-audio.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class QueueService {

  private nowPlaying$ = new BehaviorSubject<DetailedAudioInterface | null>(null)
  private isPlaying$ = new BehaviorSubject<boolean>(false);

  constructor(
  ) { }

  setAudio(details: DetailedAudioInterface) {
    this.nowPlaying$.next(details)
    this.isPlaying$.next(true)
  }

  setQueue(playlistName: string) {
    // this.nowPlaying$.next(details)
    // this.queueLength = details.length
    // this.dataService.getVideoDetails(details[0].videoId)
    // this.isPlaying$.next(true)
  }

  play(){
    this.isPlaying$.next(true)
  }

  pause(){
    this.isPlaying$.next(false)
  }

  togglePlayStatus() {
    this.isPlaying$.next(!this.isPlaying$.getValue())
  }

  listenToSongChanges(): BehaviorSubject<DetailedAudioInterface | null> {
    return this.nowPlaying$
  }

  listenToPlayStatus(): BehaviorSubject<boolean> {
    return this.isPlaying$
  }
}
