import { Component } from "@angular/core";
import { DirectedEdgeGraf } from "./DirectedEdgeGraf";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular-app";

  constructor() {
    const graf = new DirectedEdgeGraf("1->2,2->3,4,0->1");

    console.log(graf.findValidOrdering());
  }
}
