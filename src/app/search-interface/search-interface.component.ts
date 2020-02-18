import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team.interface';
import { Player } from '../interfaces/player.interface'
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { RosterqueryService } from '../services/rosterquery.service';


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
  searchpick: string = "roster"
  roster: Array<Player> = []


  constructor(private user: UserService, private staticquery: StaticqueryService, private rosterquery: RosterqueryService) {
    this.curteam = this.user.currentUser.favteam;
    this.nextteam = this.curteam
  }

  ngOnInit(): void {;
    this.searchInit();
  }

  showRoster(team: string) {
    this.rosterquery.fetchRoster(team).subscribe(roster => {
      this.roster = [...roster["roster_40"]["queryResults"]["row"]];
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
