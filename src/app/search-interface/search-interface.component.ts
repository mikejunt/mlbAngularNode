import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { RosterqueryService } from '../services/roster-query.service';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { TeamState } from '../store/reducers';
import { HttpParams } from '@angular/common/http';
import * as Selectors from '../store/selectors';


@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam = ""
  teamlist$: Observable<TeamState> 
  nextteam: string = ""
  searchmode: string = "roster"
  searchpick: string = "roster"
  teamlist


  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private rosterquery: RosterqueryService, private router: Router, private actr: ActivatedRoute, private store: Store<AppState>) {
    this.curteam = this.user.currentUser.favteam;
    this.nextteam = this.curteam;
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
  }

  ngOnInit(): void {
    this.searchInit();
  }

  showRoster(team: string) {
    const params = new HttpParams().set('team_id', `'${team}'`)
    this.rosterquery.fetchRoster(params)
  }

  searchInit() {
    this.curteam = this.nextteam;
    this.searchpick = this.searchmode;
    console.log(this.searchpick)
    if (this.searchpick === "roster") {
      this.showRoster(this.curteam);
      // this.router.navigate(['roster'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curhitting") {
      // this.hitstats = this.staticquery.allplayerhitting.filter(obj => obj["team_id"] === this.curteam);
      // this.router.navigate(['hitting'], {relativeTo: this.actr})
    }
    if (this.searchpick === "curpitching") {
      // this.pitchstats = this.staticquery.allplayerpitching.filter(obj => obj["team_id"] === this.curteam);
      // this.router.navigate(['pitching'], {relativeTo: this.actr})
    }
  }
}
