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
  private queue$ = new BehaviorSubject<{isActive: boolean, videoIDs: string[]}>({isActive: false, videoIDs: []})
  private queuePosition$ = new BehaviorSubject<number>(0)

  constructor(
  ) {}

  setAudio(details: DetailedAudioInterface) {
    this.nowPlaying$.next(details)
    this.isPlaying$.next(true)
  }

  setQueue(playlistName: string, playlistData: AudioInterface[]) {
    // this.nowPlaying$.next(details)
    // this.queueLength = details.length
    // this.dataService.getVideoDetails(details[0].videoId)
    // this.isPlaying$.next(true)
    let videoIDs: string[] = []
    
    playlistData.forEach(item => {
      videoIDs.push(item.videoId)
    })
    // console.log(videoIDs);
    this.queuePosition$.next(0)
    this.queue$.next({isActive: true, videoIDs: videoIDs})
  }

  getQueuePos() {
    return this.queuePosition$
  }

  nextQueuePos() {
    this.queuePosition$.next(this.queuePosition$.getValue() + 1)
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

  listenToQueueChanges() {
    return this.queue$
  }

  listenToPlayStatus(): BehaviorSubject<boolean> {
    return this.isPlaying$
  }
}
