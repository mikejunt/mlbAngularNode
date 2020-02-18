import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { ApidataService } from '../apidata.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  

  constructor(private user: UserService, private api: ApidataService) { }


  ngOnInit(): void {this.api.fetchTeams() }

  logincheck() { this.user.authenticate(this.username, this.password) }
}
