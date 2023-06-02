import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  interval,
  Subscription,
} from "rxjs";

import { QueueService } from "src/app/services/queue.service";
import SelectedAudioInterface from "src/app/interfaces/selected-audio.interface";
import { NotificationService } from "src/app/services/notification.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { DummyComponent } from "../dummy/dummy.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent {
  @ViewChild("playerRef") playerRef!: ElementRef;

  isPlaying = new BehaviorSubject(false);
  currentTime = new BehaviorSubject(0);
  maxTime = 0;
  player = new Audio();
  source = interval(1000);
  timeSub: Subscription = Subscription.EMPTY;
  isMinimised = true;
  isNextSong = true;
  isPreviousSong = false;
  selectedAudio: SelectedAudioInterface = {
    url: "",
    genre: "",
    type: "",
    title: "",
    videoId: "",
    albumArt: "",
    author: "",
    lengthSeconds: 0,
    videoThumbnails: [],
  };

  constructor(
    private queue: QueueService,
    private notification: NotificationService,
    private matSheet: MatBottomSheet,
    private title: Title
  ) {
    this.queue.listenToSongChanges().subscribe((data) => {
      if (data) {
        this.selectedAudio = data;
        this.player.src = data.adaptiveFormats[1].url;
        this.play();
        this.title.setTitle(data.title)
        navigator.mediaSession.metadata = new MediaMetadata({
          artist: data.author,
          title: data.title,
          artwork: [{src: data.videoThumbnails[2].url}],
        })
      }
    });

    this.queue
      .listenToPlayStatus()
      .pipe(distinctUntilChanged())
      .subscribe((status) => {
        console.log("listeining to play status", status);
        this.isPlaying.next(status);
      });

    fromEvent(this.player, "error").subscribe(() => {
      this.notification.notifyUser(
        "Error: This media cannot be played. Please try another."
      );
      this.stopEmitting();
    });

    fromEvent(this.player, "pause").subscribe(() => {
      this.queue.pause();
      this.stopEmitting();
    });

    fromEvent(this.player, "play").subscribe(() => {
      this.queue.play();
      this.startEmitting();
      this.isNextSong = this.queue.isNext();
      this.isPreviousSong = this.queue.isPrevious();
    });

    fromEvent(this.player, "ended").subscribe(() => {
      this.queue.nextQueuePos();
    });
  }

  toggleAudio() {
    this.isPlaying.getValue() ? this.pause() : this.play();
  }

  play() {
    this.player.play();
    this.queue.play();
    this.startEmitting();
    this.isPlaying.next(true);
  }

  pause() {
    this.player.pause();
    this.queue.pause();
    this.isPlaying.next(false);
    this.stopEmitting();
  }

  next() {
    this.queue.nextQueuePos();
    this.isNextSong = this.queue.isNext();
    console.log(this.isNextSong);
  }

  previous() {
    this.queue.previousQueuePos();
    this.isPreviousSong = this.queue.isPrevious();
  }

  startEmitting() {
    if (this.timeSub.closed) {
      this.timeSub = this.source.subscribe(() => {
        console.log(this.player.currentTime, this.selectedAudio.lengthSeconds);

        this.currentTime.next(this.player.currentTime);
        if (this.player.ended) {
          this.currentTime.next(this.selectedAudio.lengthSeconds);
          this.stopEmitting();
        }
      });
    }
  }

  stopEmitting() {
    this.timeSub.unsubscribe();
  }

  togglePlayerState() {
    this.isMinimised = !this.isMinimised;
  }

  showQueue() {
    this.matSheet.open(DummyComponent);
  }
}
