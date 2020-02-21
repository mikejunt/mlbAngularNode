import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { HittingQueryService } from '../services/hitting-query.service';
import { PitchingQueryService } from '../services/pitching-query.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  

  constructor(private user: UserService, private staticquery: StaticqueryService, private hitting: HittingQueryService, private pitching: PitchingQueryService) { }


  ngOnInit(): void {this.staticquery.fetchTeams();this.hitting.fetchSeasonHitting(),this.pitching.fetchSeasonPitching() }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
