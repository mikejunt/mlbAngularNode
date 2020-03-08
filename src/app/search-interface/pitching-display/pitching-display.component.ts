import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitcher } from 'src/app/interfaces/pitcher.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';
import { Team } from 'src/app/interfaces/team.interface';
import { SearchTerms } from 'src/app/interfaces/search.terms.interface';

@Component({
  selector: 'app-pitching-display',
  templateUrl: './pitching-display.component.html',
  styleUrls: ['./pitching-display.component.scss']
})
export class PitchingDisplayComponent implements OnInit {
  displayteam$: Observable<string>
  pitchers$: Observable<Pitcher[]>;
  displayedColumns: string[] = ['player', 'fip', 'so', 'era']
  pitchers: Pitcher[]
  ipselect: string = "100"
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  teamview: string = "allteams"
  searchterms$: Observable<SearchTerms>

  constructor(private store: Store<AppState>) {
    this.pitchers$ = this.store.select(Selectors.viewPitching)
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam); 
    this.pitchers$.subscribe(pitch => this.pitchers = pitch); 
    this.teamlist$ = this.store.select(Selectors.viewTeams);
    this.teamlist$.subscribe(res => this.teamlist = res);
    this.searchterms$ = this.store.select(Selectors.viewSearchTerms);
    this.searchterms$.subscribe(res =>{this.ipselect = res.ipfilter;this.teamview = res.teamfilter})
  }

  ngOnInit(): void {
    let terms: SearchTerms = {searchyear: "2019", posfilter: "all", ipfilter: "100", teamfilter: "allteams", pafilter: "500"}
    this.store.dispatch(Actions.saveSearchTerms({searchterms: terms}))
  }

}
