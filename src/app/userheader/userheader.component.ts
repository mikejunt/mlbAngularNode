import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Team } from '../interfaces/team.interface';
import { StaticqueryService } from '../static-query.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  curteam:string = this.user.currentUser.favteam;
  teamlist: Array<Team> = [...this.staticquery.teamlist];
  favteam:string = this.user.currentUser.favteam;
  username = this.user.currentUser.username;
  
  constructor(private user: UserService, private staticquery: StaticqueryService) { }

  ngOnInit(): void { }

  logout() {this.user.logout()}  

}
