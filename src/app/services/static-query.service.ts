import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  allplayerhitting: Array<Object>
  allplayerpitching: Array<Object>
  // teamlist$: Observable<Array<Team>>
  private seasonpitchingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_pitching.bam?season='2019'&sport_code='mlb'&game_type='R'`
  private seasonhittingUrl = `http://lookup-service-prod.mlb.com/json/named.cur_hitting.bam?season='2019'&sport_code='mlb'&game_type='R'`
  private teamsUrl = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2020'`;
  copynotice: string = ""
  lgFIPconstant: number = 0

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

  fetchSeasonHitting() {
    this.http.get(this.seasonhittingUrl)
      .pipe(
        retry(3),
        catchError(err => this.logError(err)))
      .subscribe(response => {
        this.allplayerhitting = response["cur_hitting"]["queryResults"]["row"]
        console.log(this.allplayerhitting)
      })
  }

  fetchSeasonPitching() {
    this.http.get(this.seasonpitchingUrl)
      .pipe(
        retry(3),
        catchError(err => this.logError(err)),
        map(res => res = res["cur_pitching"]["queryResults"]["row"]),
        map(res => res.map(res => { let finalIP: number = parseFloat(res["ip"]); finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3)); res["ipn"] = finalIP; return res })),
        tap(pitchers => {
          let leaguehr = pitchers.reduce((hr: number, pitcher) => hr + parseFloat(pitcher["hr"]), 0);
          let leaguebb = pitchers.reduce((bb: number, pitcher) => bb + parseFloat(pitcher["bb"]), 0);
          let leaguehb = pitchers.reduce((hb: number, pitcher) => hb + parseFloat(pitcher["hb"]), 0);
          let leagueso = pitchers.reduce((so: number, pitcher) => so + parseFloat(pitcher["so"]), 0);
          let leagueer = pitchers.reduce((er: number, pitcher) => er + parseFloat(pitcher["er"]), 0);
          let leagueip = pitchers.reduce((ip: number, pitcher) => ip + pitcher["ipn"], 0);
          let leagueERA = ((leagueer / leagueip) * 9);
          this.lgFIPconstant = leagueERA - (((13 * leaguehr) + (3 * (leaguebb + leaguehb)) - (2 * leagueso)) / leagueip)
        }),
        map(res => res.map(res => {
          let pitcherFIP = ((((13 * parseInt(res["hr"])) + (3 * (parseInt(res["bb"]) + parseInt(res["hb"]))) - (2 * parseInt(res["so"]))) / res["ipn"]) + this.lgFIPconstant);
        res["fip"] = pitcherFIP.toFixed(2);return res})))
          .subscribe(response => {
            this.allplayerpitching = response
            console.log(this.allplayerpitching)
          })
  }


  logError(err) { console.log(err); return err }

}