import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { HittingQueryService } from '../services/hitting-query.service';
import { PitchingQueryService } from '../services/pitching-query.service';
import { HttpParams } from '@angular/common/http';
import { AppState } from '../store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private hitting: HittingQueryService, private pitching: PitchingQueryService, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    // const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
    this.staticquery.fetchTeams();
    this.staticquery.fetchTrx();
  }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
