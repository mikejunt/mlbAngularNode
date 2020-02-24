import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Team } from 'src/app/interfaces/team.interface';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-team-desc',
  templateUrl: './team-desc.component.html',
  styleUrls: ['./team-desc.component.scss']
})
export class TeamDescComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  this.teamlist$ = this.store.select(Selectors.viewTeams);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam);
    this.teamlist$.subscribe(res => this.teamlist = res)
    this.displayteam$.subscribe(res => {let team = this.teamlist.filter(teamx => teamx["mlb_org_id"] === res);
    this.displayteam = team[0];console.log(this.displayteam)})
  }
  teamlist$: Observable<Team[]>;
  displayteam$: Observable<string>;
  displayteam: Team;
  teamlist: Team[];

  ngOnInit(): void {

  }

}
