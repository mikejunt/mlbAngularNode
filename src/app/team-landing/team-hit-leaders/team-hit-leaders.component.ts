import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-hit-leaders',
  templateUrl: './team-hit-leaders.component.html',
  styleUrls: ['./team-hit-leaders.component.scss']
})
export class TeamHitLeadersComponent implements OnInit {
  displayteam$: Observable<string>
  hitters$: Observable<Hitter[]>;
  displayedColumns: string[] = ['Name', 'HR', 'OPS', 'SLG']

  constructor(private store: Store<AppState>) { this.hitters$ = this.store.select(Selectors.viewHitting)
  this.displayteam$ = this.store.select(Selectors.viewSelectedTeam) }
  ngOnInit(): void {
  }

}
