import { Component, Input } from "@angular/core";
import { distinctUntilChanged, map, switchMap } from "rxjs";
import AudioInterface from "src/app/interfaces/audio.interface";
import { DataService } from "src/app/services/data.service";
import { QueueService } from "src/app/services/queue.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.scss"],
})
export class PlaylistsComponent {
  playlists: Array<{ name: string; data: AudioInterface[] }> = [];
  queuePosition = 0;

  @Input() verb = "";

  constructor(
    private storageService: StorageService,
    private queueService: QueueService,
    private dataService: DataService
  ) {
    this.playlists = this.storageService.getAllPlaylists();

    this.queueService
      .getQueuePos()
      .pipe(
        distinctUntilChanged(),
        switchMap((position) => {
          return this.queueService.listenToQueueChanges().pipe(
            map((queue) => {
              this.queuePosition = position;
              return queue;
            })
          );
        })
      )
      .subscribe((queue) => {
        console.log("Inside SwitchMap Sub");

        if (queue.isActive)
          this.getVideoDetails(queue.videoIDs[this.queuePosition]);

        console.log("Queue is not active");
      });
  }

  addToQueue(playlistName: string, playlistData: AudioInterface[]) {
    this.queueService.setQueue(playlistName, playlistData);
  }

  getVideoDetails(videoId: string) {
    this.dataService.getVideoDetails(videoId).subscribe((result) => {
      this.queueService.setAudio(result);
    });
  }
}
