import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerbypos'
})
export class PlayerbyposPipe implements PipeTransform {

  transform(player: Object[], position: string): Object[] {
    let tofilter = [...player];
    let filteredplayers = tofilter.filter(obj => obj["primary_position"] === position)
    return filteredplayers
  }
}