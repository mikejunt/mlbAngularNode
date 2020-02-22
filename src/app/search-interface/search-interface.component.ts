import { Component, OnInit } from '@angular/core';
import { StaticqueryService } from '../services/static-query.service';
import { RosterService } from '../services/roster-query.service';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { HttpParams } from '@angular/common/http';
import * as Selectors from '../store/selectors';
import { Team } from '../interfaces/team.interface';
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';


@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam$:Observable<string>
  teamlist$: Observable<Team[]> 
  nextteam: string = ""
  searchmode: string = "roster"
  searchpick: string = "roster"


  constructor(private staticquery: StaticqueryService, 
    private rosterquery: RosterService, private router: Router, private actr: ActivatedRoute,
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) {
    this.curteam$ = store.pipe(select(Selectors.viewSelectedTeam));
    this.curteam$.subscribe(res => this.nextteam = res);
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
  }

  ngOnInit(): void {
    this.searchInit();
  }

  showRoster(team: string) {
    const params = new HttpParams().set('team_id', `'${team}'`)
    this.rosterquery.fetchRoster(params)
  }

  searchInit() {
    this.searchpick = this.searchmode;
    console.log(this.searchpick)
    if (this.searchpick === "roster") {
      this.showRoster(this.nextteam);
      this.store.dispatch(Actions.setViewTeam({displayteam: this.nextteam}))
      this.router.navigate(['roster'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curhitting") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
      this.hitting.fetchSeasonHitting(params)
      this.router.navigate(['hitting'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curpitching") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
      this.pitching.fetchSeasonPitching(params) 
      this.router.navigate(['pitching'], {relativeTo: this.actr})
    }
  }
}
