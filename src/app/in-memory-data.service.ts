import { Injectable } from '@angular/core';
import { Team } from './interfaces/team.interface';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const teams: Array<Team> = [
            {
                "name_display_full": "Baltimore Orioles",
                "mlb_org_id": "110"
            },
            {
                "name_display_full": "Boston Red Sox",
                "mlb_org_id": "111"
            },
            {
                "name_display_full": "Chicago White Sox",
                "mlb_org_id": "145"
            },
            {
                "name_display_full": "Cleveland Indians",
                "mlb_org_id": "114"
            },
            {
                "name_display_full": "Detroit Tigers",
                "mlb_org_id": "116"
            },
            {
                "name_display_full": "Houston Astros",
                "mlb_org_id": "117"
            },
            {
                "name_display_full": "Kansas City Royals",
                "mlb_org_id": "118"
            },
            {
                "name_display_full": "Los Angeles Angels",
                "mlb_org_id": "108"
            },
            {
                "name_display_full": "Minnesota Twins",
                "mlb_org_id": "142"
            },
            {
                "name_display_full": "New York Yankees",
                "mlb_org_id": "147"
            },
            {
                "name_display_full": "Oakland Athletics",
                "mlb_org_id": "133"
            },
            {
                "name_display_full": "Seattle Mariners",
                "mlb_org_id": "136"
            },
            {
                "name_display_full": "Tampa Bay Rays",
                "mlb_org_id": "139"
            },
            {
                "name_display_full": "Texas Rangers",
                "mlb_org_id": "140"
            },
            {
                "name_display_full": "Toronto Blue Jays",
                "mlb_org_id": "141"
            },
            {
                "name_display_full": "Arizona Diamondbacks",
                "mlb_org_id": "109"
            },
            {
                "name_display_full": "Atlanta Braves",
                "mlb_org_id": "144"
            },
            {
                "name_display_full": "Chicago Cubs",
                "mlb_org_id": "112"
            },
            {
                "name_display_full": "Cincinnati Reds",
                "mlb_org_id": "113"
            },
            {
                "name_display_full": "Colorado Rockies",
                "mlb_org_id": "115"
            },
            {
                "name_display_full": "Los Angeles Dodgers",
                "mlb_org_id": "119"
            },
            {
                "name_display_full": "Miami Marlins",
                "mlb_org_id": "146"
            },
            {
                "name_display_full": "Milwaukee Brewers",
                "mlb_org_id": "158"
            },
            {
                "name_display_full": "New York Mets",
                "mlb_org_id": "121"
            },
            {
                "name_display_full": "Philadelphia Phillies",
                "mlb_org_id": "143"
            },
            {
                "name_display_full": "Pittsburgh Pirates",
                "mlb_org_id": "134"
            },
            {
                "name_display_full": "San Diego Padres",
                "mlb_org_id": "135"
            },
            {
                "name_display_full": "San Francisco Giants",
                "mlb_org_id": "137"
            },
            {
                "name_display_full": "St. Louis Cardinals",
                "mlb_org_id": "138"
            },
            {
                "name_display_full": "Washington Nationals",
                "mlb_org_id": "120"
            }
        ];
        const users: Array<User> = [
                {userid: 1, username: "Mike", password: "password", favteam: "119" }, 
                {userid: 2, username: "Sarah", password: "password", favteam: "134" }, 
                {userid: 3, username: "Justin", password: "password", favteam: "137" }
              ]
        return { teams, users };
    }
}
