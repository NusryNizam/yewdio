import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import AudioInterface from "../interfaces/audio.interface";
import DetailedAudioInterface from "../interfaces/detailed-audio.interface";
import { QueueService } from "./queue.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private _url = `https://yt.funami.tech/api/v1/`;

  private audioList$ = new BehaviorSubject<AudioInterface[]>([]);
  public searchTerm$ = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, private queue: QueueService) {}

  getSearchResults(searchTerm: string): Observable<AudioInterface[]> {
    searchTerm = searchTerm.trim().toLowerCase();
    return this.http.get<AudioInterface[]>(
      `${this._url}search?q=${searchTerm}`
    );
  }

  getSearchResults2(searchTerm: string): void {
    searchTerm = searchTerm.trim().toLowerCase();
    this.searchTerm$.next(searchTerm);
    this.http
      .get<AudioInterface[]>(`${this._url}search?q=${searchTerm}`)
      .subscribe((audioList) => this.audioList$.next(audioList));
  }

  getResultAudio() {
    return this.audioList$;
  }

  getVideoDetails(videoId: string): Observable<DetailedAudioInterface> {
    return this.http.get<DetailedAudioInterface>(
      `${this._url}videos/${videoId}`
    );
  }
}
