import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-trx-display',
  templateUrl: './trx-display.component.html',
  styleUrls: ['./trx-display.component.scss']
})
export class TrxDisplayComponent implements OnInit {
  trx$: Observable<Transaction[]>;
  displayedColumns: string[] = ['trx'];
  displayteam$

  constructor(private store: Store<AppState>) { this.trx$ = this.store.select(Selectors.viewTrx);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam) }


  ngOnInit(): void {
  }

}
