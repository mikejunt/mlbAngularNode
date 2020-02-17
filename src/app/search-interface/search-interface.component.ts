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
    this.showRoster(this.curteam);
  }

  showRoster(team: string) {
    this.api.fetchRoster(team).subscribe(roster => {
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
