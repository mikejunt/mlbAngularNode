import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApidataService } from '../apidata.service';
import { Team } from '../interfaces/team.interface';
import { Player } from '../interfaces/player.interface'

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam = ""
  teamlist: Array<Team> = []
  nextteam: string = ""
  searchmode: string = "roster"
  searchpick: string
  roster: Array<Player>


  constructor(private user: UserService, private api: ApidataService) {
    this.curteam = this.user.currentUser.favteam;
    this.nextteam = this.curteam
  }

  ngOnInit(): void {
    this.teamlist = [...this.api.teamlist];
  }

  search() { 
    this.curteam = this.nextteam;
    this.searchpick = this.searchmode 
    this.api.initSearch(this.searchmode, this.curteam);
    this.roster = [...this.api.roster] }

}
