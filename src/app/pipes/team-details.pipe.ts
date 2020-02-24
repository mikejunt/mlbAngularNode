import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../interfaces/team.interface';

@Pipe({
  name: 'teamDetails'
})
export class TeamDetailsPipe implements PipeTransform {

  transform(teamlist: Team[], viewteam: string): Team {
    console.log(teamlist)
    console.log(viewteam)
    let team = teamlist.filter(team => team["mlb_org_id"] === viewteam)
    console.log(team)
    return team[0];
  }

}
