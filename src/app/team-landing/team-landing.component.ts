import { Component, OnInit } from '@angular/core';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import * as Selectors from '../store/selectors'

@Component({
  selector: 'app-team-landing',
  templateUrl: './team-landing.component.html',
  styleUrls: ['./team-landing.component.scss']
})
export class TeamLandingComponent implements OnInit {
  displayteam$: Observable<string>
  displayteam: string

  constructor(private store: Store<AppState>, private staticquery: StaticqueryService) {   }

  ngOnInit(): void {
    
  }

}
