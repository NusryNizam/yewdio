import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import AudioInterface from "../interfaces/audio.interface";
import DetailedAudioInterface from "../interfaces/detailed-audio.interface";
import { QueueService } from "./queue.service";
import { environment } from "src/environments/environment";
import { Instances, InvidiousData } from "../interfaces/api.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private _url = ''

  private audioList$ = new BehaviorSubject<AudioInterface[]>([]);
  public searchTerm$ = new BehaviorSubject<string>("");
  private isSearching$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private queue: QueueService) {
    
    this.http.get<InvidiousData[]>(`https://api.invidious.io/instances.json?sort_by=api`)
    .subscribe(data => {
      let transformedData: Instances[] = data.map(
        ([_, value]) => ({
          cors: value.cors,
          api: value.api,
          type: value.type,
          uri: value.uri,
        }),
      );

      transformedData = transformedData.filter(
        (data) =>
          data.cors && data.api && data.type === "https",
      );

      this._url = transformedData[0].uri

    })

  }

  getSearchResults(searchTerm: string): Observable<AudioInterface[]> {
    searchTerm = searchTerm.trim().toLowerCase();
    return this.http.get<AudioInterface[]>(
      `${this._url}/api/v1/search?q=${searchTerm}`
    );
  }

  isSearching() {
    return this.isSearching$
  }

  getSearchResults2(searchTerm: string): void {
    this.isSearching$.next(true)
    searchTerm = searchTerm.trim().toLowerCase();
    this.searchTerm$.next(searchTerm);
    this.http
      .get<AudioInterface[]>(`${this._url}/api/v1/search?q=${searchTerm}`)
      .subscribe((audioList) => {
        this.audioList$.next(audioList)
        this.isSearching$.next(false)
      });
  }

  getResultAudio() {
    return this.audioList$;
  }

  getVideoDetails(videoId: string): Observable<DetailedAudioInterface> {
    return this.http.get<DetailedAudioInterface>(
      `${this._url}/api/v1/videos/${videoId}`
    );
  }
}
