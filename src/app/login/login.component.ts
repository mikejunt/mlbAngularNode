import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service' 
import { User } from '../interfaces/user.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
username: string;
password: string;

  constructor(private user: UserService) { }


  ngOnInit(): void {
  }
logincheck() {console.log("Log from component function"); this.user.authenticate(this.username,this.password)}
}
