import { Component, OnInit, isDevMode } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
