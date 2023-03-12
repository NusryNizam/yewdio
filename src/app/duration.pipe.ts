import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(value: number, type: "M" | "S"): string {
    if (type === "M") return `${Math.floor(value / 60).toFixed(0)}`;

    if (type === "S") return `${(value % 60).toFixed(0)}`;

    return "";
  }
}
