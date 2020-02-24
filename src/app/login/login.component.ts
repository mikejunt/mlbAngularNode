import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) { }

  ngOnInit(): void {
    this.staticquery.fetchTeams();
    // this.staticquery.fetchTrx();
    const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `20200210`).set('end_date', `'20200217'`);
    this.staticquery.fetchTrx(params)
    const statparams = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`);
    this.hitting.fetchSeasonHitting(statparams)
    this.pitching.fetchSeasonPitching(statparams) 
  }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
