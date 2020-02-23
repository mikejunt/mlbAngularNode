import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.staticquery.fetchTeams();
    // this.staticquery.fetchTrx();
    const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `20200210`).set('end_date', `'20200217'`);
    this.staticquery.fetchTrx(params) 
  }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
