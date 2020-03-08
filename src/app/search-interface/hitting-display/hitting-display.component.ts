import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import { Team } from 'src/app/interfaces/team.interface';
import { SearchTerms } from 'src/app/interfaces/search.terms.interface';
import * as Actions from '../../store/actions'

@Component({
  selector: 'app-hitting-display',
  templateUrl: './hitting-display.component.html',
  styleUrls: ['./hitting-display.component.scss']
})
export class HittingDisplayComponent implements OnInit {
  hitters$: Observable<Hitter[]>;
  displayedColumns: string[] = ['Name', 'HR', 'OPS', 'SLG'];
  hitters: Hitter[]
  filterpos: string = "all"
  paselect: string = "500"
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  teamview: string = "allteams"
  searchterms$: Observable<SearchTerms>

  constructor(private store: Store<AppState>) {
  this.hitters$ = this.store.select(Selectors.viewHitting);
    this.hitters$.subscribe(hit => this.hitters = hit)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.teamlist$.subscribe(res => this.teamlist = res)
    this.searchterms$ = this.store.select(Selectors.viewSearchTerms)
    this.searchterms$.subscribe(res => 
      {this.paselect = res.pafilter;this.filterpos = res.posfilter;this.teamview = res.teamfilter })
  }

  ngOnInit(): void {
    let terms: SearchTerms = {searchyear: "2019", posfilter: "all", pafilter: "500", teamfilter: "allteams", ipfilter: "100"}
    this.store.dispatch(Actions.saveSearchTerms({searchterms: terms}))
  }

}
