import { Pipe, PipeTransform, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'momentdate'
})
export class MomentdatePipe implements PipeTransform {

  transform(date: string) {
    if (date === "") {return date}
    let displaydate = moment(date).format("dddd, MMMM, Do, YYYY")
    return displaydate
  }

}
