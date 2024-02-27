import { Component, OnInit } from "@angular/core";
import AudioInterface from "src/app/interfaces/audio.interface";
import { DataService } from "src/app/services/data.service";
import { QueueService } from "src/app/services/queue.service";
import { StorageService } from "src/app/services/storage.service";

interface RecentsInterface {
  title: string;
  author: string;
  length: number;
  albumArt: string;
  videoId: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  recents: RecentsInterface[] = [];
  playlists: Array<{ name: string; data: AudioInterface[] }> = [];

  constructor(
    private storageService: StorageService,
    private queueService: QueueService,
    private dataService: DataService
  ) {
    this.playlists = this.storageService.getAllPlaylists();
  }

  ngOnInit(): void {}

  getVideoDetails(videoId: string) {
    this.queueService.removeQueue();
    this.queueService.resetQueuePos();
    this.dataService.getVideoDetails(videoId).subscribe((result) => {
      this.queueService.setAudio(result);
    });
  }

}
