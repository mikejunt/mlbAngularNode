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
  teamlist$: Observable<Object>
  hittingstats$: Observable<Object>
  pitchingstats$: Observable<Object>
  private seasonpitchingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_pitching.bam?`
  private seasonhittingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?`
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?`;
  copynotice: string = ""
  lgFIPconstant: number = 3.10

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

  fetchSeasonPitching() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type', `'R'`).set('season', `'2019'`)
    this.http.get(this.seasonpitchingUrl, { params })
      .pipe(
        retry(3),
        debounceTime(5000),
        distinctUntilChanged(),
        catchError(err => this.logError(err)),
        map(res => res = res["cur_pitching"]["queryResults"]["row"]),
        map(res => res.map(res => {
          let finalIP: number = parseFloat(res["ip"]);
          finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3));
          res["ipn"] = finalIP; return res
        })),
        tap(pitchers => {
          let leaguehr: number = this.collect(pitchers, "hr");
          let leaguebb: number = this.collect(pitchers, "bb");
          let leaguehb: number = this.collect(pitchers, "hb");
          let leagueso: number = this.collect(pitchers, "so");
          let leagueer: number = this.collect(pitchers, "er");
          let leagueip: number = this.collect(pitchers, "ipn");
          let leagueERA: number = ((leagueer / leagueip) * 9);
          this.lgFIPconstant = leagueERA - (((13 * leaguehr) + (3 * (leaguebb + leaguehb)) - (2 * leagueso)) / leagueip)
        }),
        map(res => res.map(res => {
          let pitcherFIP = ((((13 * parseInt(res["hr"])) + (3 * (parseInt(res["bb"]) + parseInt(res["hb"]))) - (2 * parseInt(res["so"]))) / res["ipn"]) + this.lgFIPconstant);
          res["fip"] = pitcherFIP.toFixed(2); return res
        })))
      .subscribe(response => { this.store.dispatch(Actions.savePitchers({ pitching: response })) })
  }


  logError(err) { console.log(err); return err }

}