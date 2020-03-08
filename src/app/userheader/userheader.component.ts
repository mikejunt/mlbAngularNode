import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';
import * as Selectors from  '../store/selectors';
import * as Actions from '../store/actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  username$: Observable<string>;
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  
  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private store: Store<AppState>, private router: Router) {
      this.username$ = this.store.select(Selectors.viewUserName)
      this.teamlist$ = this.store.select(Selectors.viewTeams)
      this.teamlist$.subscribe(res => this.teamlist = res)
    }

  ngOnInit(): void { }

  viewteam(teamid: string) {
    console.log("menu emits", teamid)
    this.staticquery.fetchTeamDetails(teamid)
    this.store.dispatch(Actions.setViewTeam({displayteam: teamid}))
    this.router.navigate(['/landing'])
  }

  logout() {this.user.logout()}  

}
