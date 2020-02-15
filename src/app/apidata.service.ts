import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Team } from './interfaces/team.interface'
import { Player } from './interfaces/player.interface'

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  teamlist: Array<Team> = []
  roster: Array<Player> = []
  private teamsUrl = 'api/teams';
  private rosterUrl = 'api/roster';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  fetchTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
  }

  listTeams() {
    this.fetchTeams().subscribe(teamlist => this.teamlist = teamlist)
  }

  fetchRoster(): Observable<Player[]> {
    return this.http.get<Player[]>(this.rosterUrl)
  }
  showRoster() {
    this.fetchRoster().subscribe(roster => this.roster = roster)
  }
  initSearch(type:string, team: string) {
    console.log(`service says search is ${type} and team is ${team}`)
    if (type === "roster") {this.showRoster()}
  }
}
