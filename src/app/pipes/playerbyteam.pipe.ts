import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerbyteam'
})
export class PlayerbyteamPipe implements PipeTransform {

  transform(player: Object[], team: string): Object[] {
    if (team === "allteams") return player
    let tofilter = [...player];
    let filteredplayers = tofilter.filter(obj => obj["team_id"] === team)
    return filteredplayers
  }
}
