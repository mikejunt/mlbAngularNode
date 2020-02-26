import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import { Team } from 'src/app/interfaces/team.interface';

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

  constructor(private store: Store<AppState>) { this.hitters$ = this.store.select(Selectors.viewHitting);
    this.hitters$.subscribe(hit => this.hitters = hit)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.teamlist$.subscribe(res => this.teamlist = res) }

  ngOnInit(): void {
  }

  setpos(e) {
    this.filterpos = e.target.id
  }

}
