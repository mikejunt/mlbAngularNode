import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player.interface'

@Pipe({
  name: 'rosterPosition'
})
export class RosterPositionPipe implements PipeTransform {

  transform(roster: Array<Player>, category: string): Array<Player> {
    let roster40 = [...roster]
    if (category === "pitcher") {
      roster40.filter((obj) => obj["primary_position"] === "1")
      return roster40
    }
    else if (category === "infield")  {
      roster40.filter((obj) => obj["primary_position"] > "1" && obj["primary_position"] < "7")
      return roster40
    }
    else if (category === "outfield") {
      roster40.filter((obj) => obj["primary_position"] > "6")
      return roster40
    }
    return roster40
  }
}
