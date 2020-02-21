import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { RosterState } from 'src/app/store/reducers';

@Component({
  selector: 'app-roster-display',
  templateUrl: './roster-display.component.html',
  styleUrls: ['./roster-display.component.scss']
})
export class RosterDisplayComponent implements OnInit {
roster$: Observable<RosterState>
roster
@Input('searchmode') searchmode: string;

  constructor(private store: Store<AppState>) {this.roster$ = this.store.pipe(select('roster'));this.roster$.subscribe(res => this.roster = res) }

  ngOnInit(): void {
  }

}
