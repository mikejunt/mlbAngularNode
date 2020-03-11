import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, debounceTime, retry, catchError, distinctUntilChanged, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';


@Injectable({
  providedIn: 'root'
})
export class HittingService {
  private seasonhittingUrl = `https://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?`

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchSeasonHitting(params: HttpParams) {
    this.http.get(this.seasonhittingUrl, { params })
      .pipe(
        retry(3),
        distinctUntilChanged(),
        catchError(err => this.logError(err)),
        map(res => res = res["cur_hitting"]["queryResults"]["row"]),
        map(res => res.map(res => {
          let OPS = (parseFloat(res["obp"]) + (parseFloat(res["slg"])));
          res["ops"] = OPS.toFixed(3);
          return res
        })))
      .subscribe(response => this.store.dispatch(Actions.saveHitters({ hitting: response })))
  }

  collect(players, stat: string): number {
    return players.reduce((acc: number, player: Object) => acc + parseFloat(player[stat]), 0)
  }

  logError(err) { console.log(err); return err }
  
}
