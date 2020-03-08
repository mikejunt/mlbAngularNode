import { Component, OnInit } from '@angular/core';
import { StaticqueryService } from '../services/static-query.service';
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
import * as moment from 'moment'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  searchmode: string = "hitting"
  searchpick: string = "hitting"
  searchyear: string = "2019"
  paselect: string = "350"
  ipselect: string = "50"
  stdate = new FormControl(moment(0, "HH").subtract(3, 'days'));
  enddate = new FormControl(moment(0, "HH"))
  minMoment = moment(0, "HH").subtract(10, 'years').format()
  maxMoment = moment(0, "HH").add(1, 'days').format()
  minDate = new Date(this.minMoment)
  maxDate = new Date(this.maxMoment)




  constructor(private staticquery: StaticqueryService, private router: Router, private actr: ActivatedRoute,
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) {
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
    this.teamlist$.subscribe(res => this.teamlist = res);
  }

  ngOnInit(): void {
    this.searchInit();
  }

  searchInit() {
    this.searchpick = this.searchmode;
    if (this.searchpick === "hitting") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'${this.searchyear}'`);
      this.hitting.fetchSeasonHitting(params)
      this.router.navigate(['hitting'], { relativeTo: this.actr })
    }
    if (this.searchpick === "pitching") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'${this.searchyear}'`);
      this.pitching.fetchSeasonPitching(params)
      this.router.navigate(['pitching'], { relativeTo: this.actr })
    }
    if (this.searchpick === "trans") {
      let start = this.stdate.value
      let end = this.enddate.value
      if (this.valiDate(start, end)) {
        let startstring = moment(start).format("YYYYMMDD");
        let endstring = moment(end).format("YYYYMMDD");
        const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `'${startstring}'`).set('end_date', `'${endstring}'`);
        this.staticquery.fetchTrx(params)
        this.router.navigate(['alltrans'], { relativeTo: this.actr })
      }
    }
  }

  valiDate(start: moment.Moment, end: moment.Moment) {
    let stvalid = (moment(start).isBetween(this.minMoment, end))
    let evalid = (moment(end).isBetween(start, moment()))
    return (stvalid && evalid)
  }



}
