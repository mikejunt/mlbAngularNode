import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { StaticqueryService } from '../static-query.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  

  constructor(private user: UserService, private staticquery: StaticqueryService) { }


  ngOnInit(): void {this.staticquery.fetchTeams() }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
