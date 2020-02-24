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
import { Hitter } from '../interfaces/hitter.interface';
import { Pitcher } from '../interfaces/pitcher.interface';
import * as moment from 'moment'
import { FormControl } from '@angular/forms';
// import { MatDatepicker } from '@angular/material/datepicker';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam$:Observable<string>
  curteam: string
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  nextteam: string = ""
  searchmode: string = "landing"
  searchpick: string = "landing"
  hitting$: Observable<Hitter[]>
  pitching$: Observable<Pitcher[]>
  pitchYr: string
  hitYr: string
  stdate = new FormControl(moment(0,"HH").subtract(10,'days'));
  enddate = new FormControl(moment(0,"HH"))
  minMoment = moment(0,"HH").subtract(10,'years').format()
  maxMoment = moment(0,"HH").format()
  minDate = new Date(this.minMoment)
  maxDate = new Date(this.maxMoment)




  constructor(private staticquery: StaticqueryService, 
    private rosterquery: RosterService, private router: Router, private actr: ActivatedRoute,
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) {
    this.curteam$ = store.pipe(select(Selectors.viewSelectedTeam));
    this.curteam$.subscribe(res => this.nextteam = res);
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
    this.pitching$ = store.pipe(select(Selectors.viewPitching));
    this.hitting$ = store.pipe(select(Selectors.viewHitting));
    this.pitching$.subscribe(res => {if (res.length != 0) {this.pitchYr = res[0]['season']}});
    this.hitting$.subscribe(res => {if (res.length != 0) {this.hitYr = res[0]['season']}} );
    this.curteam$.subscribe(res => this.curteam = res);
    this.teamlist$.subscribe(res => this.teamlist = res)
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
    if (this.searchpick === "landing") {
      this.showRoster(this.nextteam);
      this.store.dispatch(Actions.setViewTeam({displayteam: this.nextteam}))
      this.router.navigate(['landing'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curhitting") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
      this.store.dispatch(Actions.setViewTeam({displayteam: this.nextteam}))
      this.hitting.fetchSeasonHitting(params)
      this.router.navigate(['hitting'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curpitching") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
      this.store.dispatch(Actions.setViewTeam({displayteam: this.nextteam}))
      this.pitching.fetchSeasonPitching(params) 
      this.router.navigate(['pitching'], {relativeTo: this.actr})
    }
    if (this.searchpick === "alltrans") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `20200210`).set('end_date', `'20200217'`);
      this.store.dispatch(Actions.setViewTeam({displayteam: this.nextteam}))
      this.staticquery.fetchTrx(params) 
      this.router.navigate(['alltrans'], {relativeTo: this.actr})
    }
  }

  logit() {
    let stinput = this.stdate.value
    let einput = this.enddate.value
    let stvalid = (moment(stinput).isBetween(this.minMoment, einput))
    let evalid = (moment(einput).isBetween(stinput,moment()))
    console.log (stinput, einput, stvalid, evalid, this.maxMoment)
    if (stvalid && evalid) {console.log("Valid Yo")}
  }



}
