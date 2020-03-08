import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';
import * as Selectors from '../store/selectors';
import * as Actions from '../store/actions'
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { RosterService } from '../services/roster-query.service'
import { Hitter } from '../interfaces/hitter.interface';
import { Pitcher } from '../interfaces/pitcher.interface';
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  username$: Observable<string>;
  teamlist$: Observable<Team[]>;
  teamlist: Team[];
  displayteam$: Observable<string>
  displayteam: string
  hitting$: Observable<Hitter[]>
  pitching$: Observable<Pitcher[]>
  pitchYr: string
  hitYr: string

  constructor(private user: UserService, private staticquery: StaticqueryService,
    private store: Store<AppState>, private router: Router, private roster: RosterService,
    private hitting: HittingService, private pitching: PitchingService) {
    this.username$ = this.store.select(Selectors.viewUserName)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.teamlist$.subscribe(res => this.teamlist = res)
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam)
    this.displayteam$.subscribe(res => this.displayteam = res)
    this.pitching$ = store.pipe(select(Selectors.viewPitching));
    this.hitting$ = store.pipe(select(Selectors.viewHitting));
    this.pitching$.subscribe(res => { if (res.length != 0) { this.pitchYr = res[0]['season'] } });
    this.hitting$.subscribe(res => { if (res.length != 0) { this.hitYr = res[0]['season'] } });
  }

  getData(team: string) {
    this.staticquery.fetchTeamDetails(team)
    this.showRoster(team)
    const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`)
    if (this.hitYr != "2019") {
      this.hitting.fetchSeasonHitting(params)
    }
    if (this.pitchYr != "2019") {
      this.hitting.fetchSeasonHitting(params)
    }
  }

  ngOnInit(): void {
    this.getData(this.displayteam)
  }

  showRoster(team: string) {
    const params = new HttpParams().set('team_id', `'${team}'`)
    this.roster.fetchRoster(params)
  }

  viewteam(teamid: string) {
    this.getData(teamid)
    this.store.dispatch(Actions.setViewTeam({ displayteam: teamid }))
    this.router.navigate(['/landing'])
  }

  viewstats(category: string) {
    console.log(category)
    this.router.navigate([`/${category}`])
  }

  logout() { this.user.logout() }

}
