import { Pipe, PipeTransform } from '@angular/core';
import { Pitcher } from '../interfaces/pitcher.interface';

@Pipe({
  name: 'minip'
})
export class MinipPipe implements PipeTransform {

  transform(pitchers: Pitcher[], ip: string) {
    let tofilter = [...pitchers];
    let ipn = parseInt(ip)
    let filteredpitchers = tofilter.filter(pitcher => pitcher['ipn'] >= ipn)
    return filteredpitchers;
  }

}
