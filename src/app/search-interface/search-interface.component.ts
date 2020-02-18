import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team.interface';
import { Player } from '../interfaces/player.interface'
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';


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


  constructor(private user: UserService, private staticquery: StaticqueryService) {
    this.curteam = this.user.currentUser.favteam;
    this.nextteam = this.curteam
  }

  ngOnInit(): void {
    this.teamlist = [...this.staticquery.teamlist];
    this.showRoster(this.curteam);
  }

  showRoster(team: string) {
    this.staticquery.fetchRoster(team).subscribe(roster => {
      this.roster = roster["roster_40"]["queryResults"]["row"];
      console.log(this.roster)
    })
  }

  searchInit() {
    this.curteam = this.nextteam;
    this.searchpick = this.searchmode;
    if (this.searchpick === "roster") {
      this.showRoster(this.curteam)
    }
  }
}
