import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-roster-display',
  templateUrl: './roster-display.component.html',
  styleUrls: ['./roster-display.component.scss']
})
export class RosterDisplayComponent implements OnInit {
  roster$: Observable<Player[]>

  constructor(private store: Store<AppState>) {
    this.roster$ = this.store.pipe(select(Selectors.viewRoster));
  }

  ngOnInit(): void {
  }

}
