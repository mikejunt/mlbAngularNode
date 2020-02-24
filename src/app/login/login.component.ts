import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';
import * as moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  startdate: string
  enddate: string
  curyear: string


  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) { 
      this.enddate = moment().format('YYYYMMDD')
      this.startdate = moment().subtract(10,'days').format('YYYYMMDD')
      this.curyear = moment().subtract(1, 'year').format('YYYY')
     }

  ngOnInit(): void {
    this.staticquery.fetchTeams();
    const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `'${this.startdate}'`).set('end_date', `'${this.enddate}'`);
    this.staticquery.fetchTrx(params)
    const statparams = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'${this.curyear}'`);
    this.hitting.fetchSeasonHitting(statparams)
    this.pitching.fetchSeasonPitching(statparams) 
  }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
