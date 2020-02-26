import { Pipe, PipeTransform } from '@angular/core';
import { Hitter } from '../interfaces/hitter.interface';

@Pipe({
  name: 'minplate'
})
export class MinplatePipe implements PipeTransform {

  transform(hitters: Hitter[], pa: string) {
    let pan = parseInt(pa)
    let hitterish = [...hitters];
    let filteredh = hitterish.filter(hitter => (parseInt(hitter['tpa'])) >= pan )
    return filteredh
  }

}
