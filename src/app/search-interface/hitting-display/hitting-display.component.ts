import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-hitting-display',
  templateUrl: './hitting-display.component.html',
  styleUrls: ['./hitting-display.component.scss']
})
export class HittingDisplayComponent implements OnInit {
  hitters$: Observable<Hitter[]>;
  displayedColumns: string[] = ['Name', 'HR', 'OPS', 'SLG']

  constructor(private store: Store<AppState>) { this.hitters$ = this.store.select(Selectors.viewHitting) }

  ngOnInit(): void {
  }

}
