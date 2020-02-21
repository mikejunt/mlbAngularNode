import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, debounceTime, retry, catchError, distinctUntilChanged } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';


@Injectable({
  providedIn: 'root'
})
export class StaticqueryService {
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?`;
  copynotice: string = ""

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchTeams() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('all_star_sw', `'N'`).set('season', `'2020'`)
    this.http.get(this.teamsUrl, { params })
      .pipe(
        retry(3),
        catchError(err => this.logError(err)),
        tap(res => this.copynotice = res["team_all_season"]["copyRight"]),
        map(res => res = res["team_all_season"]["queryResults"]["row"]))
      .subscribe(teamlist => {
        this.store.dispatch(Actions.saveTeams({ teamlist: teamlist }))
      })
  }

  logError(err) { console.log(err); return err }

}