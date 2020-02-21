import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import { TeamState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  curteam:string = this.user.currentUser.favteam;
  teamlist$: Observable<TeamState>
  favteam:string = this.user.currentUser.favteam;
  username = this.user.currentUser.username;
  
  constructor(private user: UserService, private staticquery: StaticqueryService, private store: Store<AppState>) {this.teamlist$ = this.store.pipe(select("teamlist")) }

  ngOnInit(): void { }

  logout() {this.user.logout()}  

}
