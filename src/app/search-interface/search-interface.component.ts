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
import { SearchTerms } from '../interfaces/search.terms.interface';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  mode: string
  searchterms: SearchTerms = {
    ptfilter: "100",
    teamfilter: "allteams",
    posfilter: "all",
    searchyear: "2019"
  }

  constructor(private staticquery: StaticqueryService, private router: Router, private actr: ActivatedRoute,
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) {
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
    this.teamlist$.subscribe(res => this.teamlist = res);
  }

  ngOnInit(): void {
    this.mode = this.actr.snapshot.routeConfig.path
  }

  searchInit() {
    console.log(this.searchterms)
    const terms = {...this.searchterms}
    this.store.dispatch(Actions.saveSearchTerms({searchterms: terms}))
    if (this.mode === "hitting") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'${terms.searchyear}'`);
      this.hitting.fetchSeasonHitting(params)
    }
    if (this.mode === "pitching") {
      const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'${terms.searchyear}'`);
      this.pitching.fetchSeasonPitching(params)
    }
  }
}
