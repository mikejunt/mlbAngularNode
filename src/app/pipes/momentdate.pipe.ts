import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'momentdate'
})
export class MomentdatePipe implements PipeTransform {

  transform(date: string) {
    let displaydate = moment(date).format("dddd, MMMM, Do, YYYY")
    return displaydate
  }

}
