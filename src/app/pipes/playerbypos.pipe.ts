import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerbypos'
})
export class PlayerbyposPipe implements PipeTransform {

  transform(player: Object[], position: string): Object[] {
    if (position === "all") {
      return player
    }
    let tofilter = [...player];
    if (position === "ALLOF") {
      let filteredplayers = tofilter.filter(obj => obj["primary_position"] === "LF" || obj["primary_position"] === "RF" || obj["primary_position"] === "CF")
      return filteredplayers
    }
    else {
      let filteredplayers = tofilter.filter(obj => (obj["primary_position"] === position))
      return filteredplayers
    }
  }
}