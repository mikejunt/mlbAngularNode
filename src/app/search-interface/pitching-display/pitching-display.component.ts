import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitcher } from 'src/app/interfaces/pitcher.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-pitching-display',
  templateUrl: './pitching-display.component.html',
  styleUrls: ['./pitching-display.component.scss']
})
export class PitchingDisplayComponent implements OnInit {
  displayteam$: Observable<string>
  pitchers$: Observable<Pitcher[]>;
  displayedColumns: string[] = ['Name', 'FIP', 'K', 'ERA']

  constructor(private store: Store<AppState>) { this.pitchers$ = this.store.select(Selectors.viewPitching)
  this.displayteam$ = this.store.select(Selectors.viewSelectedTeam) }

  ngOnInit(): void {
  }

}
