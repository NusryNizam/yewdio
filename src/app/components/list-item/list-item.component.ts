import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BehaviorSubject } from 'rxjs';
import AudioInterface from 'src/app/interfaces/audio.interface';
import { DataService } from 'src/app/services/data.service';
import { QueueService } from 'src/app/services/queue.service';
import { DummyComponent } from '../dummy/dummy.component';
import { PlaylistSheetComponent } from '../playlist-sheet/playlist-sheet.component';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input('list') audioList$ = new BehaviorSubject<AudioInterface[]>([]);
  @Output() moreOptions = new EventEmitter()

  isEmpty = true;
  constructor(private dataService: DataService,
    private queueService: QueueService,
    private matSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: AudioInterface
  ) {
    this.isEmpty = Object.keys(data).length > 0 ? false : true 
  }


  getVideoDetails(videoId: string) {
    this.dataService.getVideoDetails(videoId)
    this.dataService.getVideoDetails(videoId).subscribe(result => {
      this.queueService.setAudio(result)
    })
  }

  rightClick(event: MouseEvent, audio: AudioInterface) {
    console.log('Right Click!');
    // console.log(JSON.stringify(audio))
    this.moreOptions.emit(audio)
    event.preventDefault()
  }

  playSelected(videoId: string) {
    this.getVideoDetails(videoId)
    this.closeSheet()
  }

  addToPlaylist(audio: AudioInterface) {
    this.closeSheet()
    this.matSheet.open(PlaylistSheetComponent, {data: audio})    
  }

  closeSheet() {
    this.matSheet._openedBottomSheetRef?.dismiss()
  }

}
