import { Component, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BehaviorSubject } from 'rxjs';
import AudioInterface from 'src/app/interfaces/audio.interface';
import { DataService } from 'src/app/services/data.service';
import { QueueService } from 'src/app/services/queue.service';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchTerm: string = '';
  audioList$ = new BehaviorSubject<AudioInterface[]>([]);

  constructor(private data: DataService, private queue: QueueService, private matSheet: MatBottomSheet) {
    console.log('Search constructor');
    this.data.getResultAudio().subscribe((results) => {
      this.audioList$.next(results)
    })

    this.data.searchTerm$.subscribe((term:string) => {
      this.searchTerm = term
    })

  }

  fetchResults() {
    this.data.getSearchResults2(this.searchTerm)
  }

  more(audio: AudioInterface){
    let config: MatBottomSheetConfig<AudioInterface> = {data: audio}
    this.matSheet.open(ListItemComponent, config)
  }
}
