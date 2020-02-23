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
  private trxUrl = 'http://lookup-service-prod.mlb.com/json/named.transaction_all.bam?';

  copynotice: string = ""

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchTrx(params) {
    this.http.get(this.trxUrl, { params })
    .pipe(
      retry(3),
      catchError(err => this.logError(err)),
      map(res => res = res["transaction_all"]["queryResults"]["row"]))
    .subscribe(trans => {
      this.store.dispatch(Actions.saveTrxList({ trxlist: trans }))
    })}

  fetchTeams() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('all_star_sw', `'N'`).set('season', `'2020'`)
    this.http.get(this.teamsUrl, { params })
      .pipe(
        retry(3),
        catchError(err => this.logError(err)),
        tap(res => this.copynotice = res["team_all_season"]["copyRight"]),
        map(res => res = res["team_all_season"]["queryResults"]["row"]))
      .subscribe(teamlist => {
        this.store.dispatch(Actions.saveTeams({ teamlist: teamlist }));
        this.store.dispatch(Actions.saveCopyNotice({copynotice: this.copynotice}))
      })
  }

  logError(err) { console.log(err); return err }

}