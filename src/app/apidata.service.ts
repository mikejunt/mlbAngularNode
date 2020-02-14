import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Team } from './interfaces/team.interface'

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  teamlist: Array<Team> = []
  private teamsUrl = 'api/teams';
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

}
