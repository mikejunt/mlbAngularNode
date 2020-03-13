import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import { Team } from 'src/app/interfaces/team.interface';
import { SearchTerms } from 'src/app/interfaces/search.terms.interface';
import * as Actions from '../../store/actions'
import * as qclone from 'qclone'
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-hitting-display',
  templateUrl: './hitting-display.component.html',
  styleUrls: ['./hitting-display.component.scss']
})
export class HittingDisplayComponent implements OnInit {
  hitters$: Observable<Hitter[]>;
  displayedColumns: string[] = ['name', 'hr', 'ops', 'slg'];
  hitters: Hitter[]
  filterpos: string = "all"
  paselect: string = "500"
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  teamview: string = "allteams"
  searchterms$: Observable<SearchTerms>
  hitdata: MatTableDataSource<Hitter>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private store: Store<AppState>) {
    this.hitters$ = this.store.select(Selectors.viewHitting);
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.searchterms$ = this.store.select(Selectors.viewSearchTerms)
  }

  sortTable(sort:Sort) {
    console.log(sort)
  }


  ngOnInit(): void {
    let terms: SearchTerms = { searchyear: "2019", posfilter: "all", pafilter: "500", teamfilter: "allteams", ipfilter: "100" }
    this.store.dispatch(Actions.saveSearchTerms({ searchterms: terms }))
    this.hitters$.subscribe(hit => {
    this.hitters = qclone.qclone(hit);
      this.hitdata = new MatTableDataSource(this.hitters);
      this.hitdata.paginator = this.paginator; 
      this.hitdata.sort = this.sort
    })
    this.searchterms$.subscribe(res => { this.paselect = res.pafilter; this.filterpos = res.posfilter; this.teamview = res.teamfilter })
    this.teamlist$.subscribe(res => this.teamlist = res)
  }

}
