import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import { Team } from 'src/app/interfaces/team.interface';

@Component({
  selector: 'app-trx-display',
  templateUrl: './trx-display.component.html',
  styleUrls: ['./trx-display.component.scss']
})
export class TrxDisplayComponent implements OnInit {
  trx$: Observable<Transaction[]>;
  trx: Transaction[]
  displayedColumns: string[] = ['trx'];
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  teamview: string = "allteams"

  constructor(private store: Store<AppState>) { this.trx$ = this.store.select(Selectors.viewTrx)
    this.trx$.subscribe(res => this.trx = res)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.teamlist$.subscribe(res => this.teamlist = res) }


  ngOnInit(): void {
  }

}
