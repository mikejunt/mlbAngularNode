import { Pipe, PipeTransform } from '@angular/core';
import { Pitcher } from '../interfaces/pitcher.interface';

@Pipe({
  name: 'minip'
})
export class MinipPipe implements PipeTransform {

  transform(pitchers: Pitcher[], ip: number) {
    let tofilter = [...pitchers];
    let filteredpitchers = tofilter.filter(pitcher => pitcher['ipn'] >= ip)
    return filteredpitchers;
  }

}
