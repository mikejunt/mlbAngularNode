import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, debounceTime, retry, catchError, distinctUntilChanged } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';


@Injectable({
  providedIn: 'root'
})
export class HittingQueryService {
  private seasonhittingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?`

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchSeasonHitting() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`)
    this.http.get(this.seasonhittingUrl, { params })
      .pipe(
        retry(3),
        debounceTime(5000),
        distinctUntilChanged(),
        catchError(err => this.logError(err)),
        map(res => res = res["cur_hitting"]["queryResults"]["row"]))
      .subscribe(response => this.store.dispatch(Actions.saveHitters({ hitting: response })))
  }


  collect(players, stat: string): number {
    return players.reduce((acc: number, player: Object) => acc + parseFloat(player[stat]), 0)
  }

  logError(err) { console.log(err); return err }

}