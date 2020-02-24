import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Team } from 'src/app/interfaces/team.interface';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-team-desc',
  templateUrl: './team-desc.component.html',
  styleUrls: ['./team-desc.component.scss']
})
export class TeamDescComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  teamlist$: Observable<Team[]>
  displayteam$: Observable<string>
  
  ngOnInit(): void {this.teamlist$ = this.store.select(Selectors.viewTeams);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam)
  }

}
