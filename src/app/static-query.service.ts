import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './interfaces/team.interface';
import { Player } from './interfaces/player.interface';
import { map, debounceTime, retry, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class StaticqueryService {
  teamlist: Array<Team>
  // teamlist$: Observable<Array<Team>>
  roster: Array<Player> = [];
  // roster$: Observable<Array<Player>>
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2020'`;
  private rosterUrl = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=`;
  copynotice: string = ""

  constructor(private http: HttpClient) { }

  fetchTeams() {
    this.http.get(this.teamsUrl)
    .pipe(
      retry(3),
      catchError(err => this.logError(err)))
    .subscribe(teamlist => {
      this.copynotice = teamlist["team_all_season"]["copyRight"];
      this.teamlist = teamlist["team_all_season"]["queryResults"]["row"]
    })
  }

  logError(err) {console.log(err);return err}

  fetchRoster(team: string): Observable<Array<Player>> {
    return this.http.get<Array<Player>>(`${this.rosterUrl}'${team}'`)
  }

}