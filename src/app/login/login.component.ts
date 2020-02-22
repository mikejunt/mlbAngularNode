import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
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
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.staticquery.fetchTeams();
    this.staticquery.fetchTrx();
  }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
