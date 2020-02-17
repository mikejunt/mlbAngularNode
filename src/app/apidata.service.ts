import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './interfaces/team.interface';
import { Player } from './interfaces/player.interface';


@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  teamlist: Array<Team> = [];
  roster: Array<Player> = [];
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2020'`;
  private rosterUrl = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=`;
  copynotice: string = ""



  constructor(private http: HttpClient) { }

  fetchTeams(): Observable<Array<Team>> {
    console.log(this.teamsUrl)
    return this.http.get<Array<Team>>(this.teamsUrl);
  }

  listTeams() {
    this.fetchTeams().subscribe(teamlist => {
      this.copynotice = teamlist["team_all_season"]["copyRight"];
      this.teamlist = teamlist["team_all_season"]["queryResults"]["row"]
      console.log(this.teamlist)
      console.log(this.copynotice)
    })
  }

  fetchRoster(team: string): Observable<Array<Player>> {
    return this.http.get<Array<Player>>(`${this.rosterUrl}'${team}'`)
  }
}