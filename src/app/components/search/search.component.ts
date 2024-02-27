import { Component, Input, OnInit } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from "@angular/material/bottom-sheet";
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged } from "rxjs";

import AudioInterface from "src/app/interfaces/audio.interface";
import { DataService } from "src/app/services/data.service";
import { QueueService } from "src/app/services/queue.service";
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  audioList$ = new BehaviorSubject<AudioInterface[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  private searchTextSubject = new Subject<string>();

  constructor(
    private data: DataService,
    private queue: QueueService,
    private matSheet: MatBottomSheet
  ) {
    this.data.getResultAudio().subscribe((results) => {
      this.audioList$.next(results);
    });

    // NOTE: Consider unsubscribing in ngOnDestroy
    this.data.searchTerm$.subscribe((term: string) => {
      this.searchTerm = term;
    });

    this.isLoading$ = this.data.isSearching()
  }

  ngOnInit(): void {
    this.searchTextSubject.pipe(
      debounceTime(450), 
      distinctUntilChanged() 
    ).subscribe(_ => {
      this.fetchResults()
    });
  }

  fetchResults() {
    this.data.getSearchResults2(this.searchTerm)
    // this.isLoading$.next(true)
  }

  more(audio: AudioInterface) {
    let config: MatBottomSheetConfig<AudioInterface> = { data: audio };
    this.matSheet.open(ListItemComponent, config);
  }

  onSearchInput(event: any): void {
    this.searchTextSubject.next(event.target.value);
  }
}
