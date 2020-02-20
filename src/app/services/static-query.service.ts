import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team.interface';
import { Hitter } from '../interfaces/hitter.interface';
import { Pitcher } from '../interfaces/pitcher.interface';
import { map, tap, debounceTime, retry, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class StaticqueryService {
  teamlist: Array<Team>
  allplayerhitting: Array<Hitter>
  allplayerpitching: Array<Pitcher>
  // teamlist$: Observable<Array<Team>>
  private seasonpitchingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_pitching.bam?`
  private seasonhittingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?`
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?`;
  copynotice: string = ""
  lgFIPconstant: number = 3.10

  constructor(private http: HttpClient) { }

  fetchTeams() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('all_star_sw',`'N'`).set('season', `'2020'`)
    this.http.get(this.teamsUrl,{ params })
      .pipe(
        retry(3),
        catchError(err => this.logError(err)))
      .subscribe(teamlist => {
        this.copynotice = teamlist["team_all_season"]["copyRight"];
        this.teamlist = teamlist["team_all_season"]["queryResults"]["row"]
      })
  }

  fetchSeasonHitting() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type',`'R'`).set('season', `'2019'`)
    this.http.get(this.seasonhittingUrl,{ params })
      .pipe(
        retry(3),
        debounceTime(5000),
        catchError(err => this.logError(err)))
      .subscribe(response => {
        this.allplayerhitting = response["cur_hitting"]["queryResults"]["row"]
        console.log(this.allplayerhitting)
      })
  }

  fetchSeasonPitching() {
    const params = new HttpParams().set('sport_code', `'mlb'`).set('game_type',`'R'`).set('season', `'2019'`)
    this.http.get(this.seasonpitchingUrl,{ params })
      .pipe(
        retry(3),
        debounceTime(5000),
        catchError(err => this.logError(err)),
        map(res => res = res["cur_pitching"]["queryResults"]["row"]),
        map(res => res.map(res => { let finalIP: number = parseFloat(res["ip"]); finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3)); res["ipn"] = finalIP; return res })),
        tap(pitchers => {
          let leaguehr: number = pitchers.reduce((hr: number, pitcher: Pitcher) => hr + parseFloat(pitcher["hr"]), 0);
          let leaguebb: number = pitchers.reduce((bb: number, pitcher: Pitcher) => bb + parseFloat(pitcher["bb"]), 0);
          let leaguehb: number = pitchers.reduce((hb: number, pitcher: Pitcher) => hb + parseFloat(pitcher["hb"]), 0);
          let leagueso: number = pitchers.reduce((so: number, pitcher: Pitcher) => so + parseFloat(pitcher["so"]), 0);
          let leagueer: number = pitchers.reduce((er: number, pitcher: Pitcher) => er + parseFloat(pitcher["er"]), 0);
          let leagueip: number = pitchers.reduce((ip: number, pitcher: Pitcher) => ip + pitcher["ipn"], 0);
          let leagueERA: number = ((leagueer / leagueip) * 9);
          this.lgFIPconstant = leagueERA - (((13 * leaguehr) + (3 * (leaguebb + leaguehb)) - (2 * leagueso)) / leagueip)
        }),
        map(res => res.map(res => {
          let pitcherFIP = ((((13 * parseInt(res["hr"])) + (3 * (parseInt(res["bb"]) + parseInt(res["hb"]))) - (2 * parseInt(res["so"]))) / res["ipn"]) + this.lgFIPconstant);
          res["fip"] = pitcherFIP.toFixed(2); return res
        })))
      .subscribe(response => {
        this.allplayerpitching = response
        console.log(this.allplayerpitching)
      })
  }


  logError(err) { console.log(err); return err }

}