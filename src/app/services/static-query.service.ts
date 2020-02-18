import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team.interface';
import { Player } from '../interfaces/player.interface';
import { map, debounceTime, retry, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class StaticqueryService {
  teamlist: Array<Team>
  allplayerstats: Array<Object>
  // teamlist$: Observable<Array<Team>>
  private seasonUrl = `http://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?season='2019'&sport_code='mlb'&game_type='R'`
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2020'`;
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

  fetchSeasonStats() {
    this.http.get(this.seasonUrl)
    .pipe(
      retry(3),
      catchError(err => this.logError(err)))
    .subscribe(response => {
      this.allplayerstats = response["cur_hitting"]["queryResults"]["row"]
      console.log(this.allplayerstats)
    })
  }

  logError(err) {console.log(err);return err}

}