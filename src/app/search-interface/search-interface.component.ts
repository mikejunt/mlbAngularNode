import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team.interface';
import { Player } from '../interfaces/player.interface'
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { RosterqueryService } from '../services/rosterquery.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  teamstats: Array<Object> = []
  roster: Array<Player> = []


  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private rosterquery: RosterqueryService, private router: Router, private actr: ActivatedRoute) {
    this.curteam = this.user.currentUser.favteam;
    this.nextteam = this.curteam
  }

  ngOnInit(): void {
    this.teamlist = this.staticquery.teamlist
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
    console.log(this.searchpick)
    if (this.searchpick === "roster") {
      this.showRoster(this.curteam);
      this.router.navigate(['roster'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curhitting") {
      this.teamstats = this.staticquery.allplayerhitting.filter(obj => obj["team_id"] === this.curteam);
      console.log(this.teamstats);
      this.router.navigate(['hitting'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curpitching") {
      this.teamstats = this.staticquery.allplayerpitching.filter(obj => obj["team_id"] === this.curteam);
      console.log(this.teamstats);
      this.router.navigate(['pitching'], {relativeTo: this.actr})
    }
  }
}
