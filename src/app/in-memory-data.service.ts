import { Injectable } from '@angular/core';
import { Team } from './interfaces/team.interface';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './interfaces/user.interface';
import { Player } from './interfaces/player.interface'

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
            { userid: 1, username: "Mike", password: "password", favteam: "119" },
            { userid: 2, username: "Sarah", password: "password", favteam: "134" },
            { userid: 3, username: "Justin", password: "password", favteam: "137" }
        ]
        const roster: Array<Player> = [
            {
                "position_txt": "P",
                "jersey_number": "75",
                "primary_position": "1",
                "name_display_first_last": "Scott Alexander",
                "player_id": "518397"
            },
            {
                "position_txt": "P",
                "jersey_number": "52",
                "primary_position": "1",
                "name_display_first_last": "Pedro Baez",
                "player_id": "520980"
            },
            {
                "position_txt": "C",
                "jersey_number": "15",
                "primary_position": "2",
                "name_display_first_last": "Austin Barnes",
                "player_id": "605131"
            },
            {
                "position_txt": "1B",
                "jersey_number": "45",
                "primary_position": "3",
                "name_display_first_last": "Matt Beaty",
                "player_id": "607461"
            },
            {
                "position_txt": "RF",
                "jersey_number": "35",
                "primary_position": "9",
                "name_display_first_last": "Cody Bellinger",
                "player_id": "641355"
            },
            {
                "position_txt": "RF",
                "jersey_number": "50",
                "primary_position": "9",
                "name_display_first_last": "Mookie Betts",
                "player_id": "605141"
            },
            {
                "position_txt": "P",
                "jersey_number": "21",
                "primary_position": "1",
                "name_display_first_last": "Walker Buehler",
                "player_id": "621111"
            },
            {
                "position_txt": "P",
                "jersey_number": "64",
                "primary_position": "1",
                "name_display_first_last": "Caleb Ferguson",
                "player_id": "657571"
            },
            {
                "position_txt": "P",
                "jersey_number": "51",
                "primary_position": "1",
                "name_display_first_last": "Dylan Floro",
                "player_id": "571670"
            },
            {
                "position_txt": "P",
                "jersey_number": "46",
                "primary_position": "1",
                "name_display_first_last": "Tony Gonsolin",
                "player_id": "664062"
            },
            {
                "position_txt": "P",
                "jersey_number": "81",
                "primary_position": "1",
                "name_display_first_last": "Victor Gonzalez",
                "player_id": "624647"
            },
            {
                "position_txt": "P",
                "jersey_number": "48",
                "primary_position": "1",
                "name_display_first_last": "Brusdar Graterol",
                "player_id": "660813"
            },
            {
                "position_txt": "2B",
                "jersey_number": "14",
                "primary_position": "4",
                "name_display_first_last": "Enrique Hernandez",
                "player_id": "571771"
            },
            {
                "position_txt": "P",
                "jersey_number": "74",
                "primary_position": "1",
                "name_display_first_last": "Kenley Jansen",
                "player_id": "445276"
            },
            {
                "position_txt": "P",
                "jersey_number": "17",
                "primary_position": "1",
                "name_display_first_last": "Joe Kelly",
                "player_id": "523260"
            },
            {
                "position_txt": "P",
                "jersey_number": "22",
                "primary_position": "1",
                "name_display_first_last": "Clayton Kershaw",
                "player_id": "477132"
            },
            {
                "position_txt": "P",
                "jersey_number": "56",
                "primary_position": "1",
                "name_display_first_last": "Adam Kolarek",
                "player_id": "592473"
            },
            {
                "position_txt": "2B",
                "jersey_number": "9",
                "primary_position": "4",
                "name_display_first_last": "Gavin Lux",
                "player_id": "666158"
            },
            {
                "position_txt": "P",
                "jersey_number": "85",
                "primary_position": "1",
                "name_display_first_last": "Dustin May",
                "player_id": "669160"
            },
            {
                "position_txt": "2B",
                "jersey_number": "73",
                "primary_position": "4",
                "name_display_first_last": "Zach McKinstry",
                "player_id": "656716"
            },
            {
                "position_txt": "1B",
                "jersey_number": "13",
                "primary_position": "3",
                "name_display_first_last": "Max Muncy",
                "player_id": "571970"
            },
            {
                "position_txt": "P",
                "jersey_number": "40",
                "primary_position": "1",
                "name_display_first_last": "Jimmy Nelson",
                "player_id": "519076"
            },
            {
                "position_txt": "LF",
                "jersey_number": "31",
                "primary_position": "7",
                "name_display_first_last": "Joc Pederson",
                "player_id": "592626"
            },
            {
                "position_txt": "CF",
                "jersey_number": "70",
                "primary_position": "8",
                "name_display_first_last": "DJ Peters",
                "player_id": "656847"
            },
            {
                "position_txt": "CF",
                "jersey_number": "11",
                "primary_position": "8",
                "name_display_first_last": "A.J. Pollock",
                "player_id": "572041"
            },
            {
                "position_txt": "P",
                "jersey_number": "33",
                "primary_position": "1",
                "name_display_first_last": "David Price",
                "player_id": "456034"
            },
            {
                "position_txt": "RF",
                "jersey_number": "62",
                "primary_position": "9",
                "name_display_first_last": "Luke Raley",
                "player_id": "670042"
            },
            {
                "position_txt": "3B",
                "jersey_number": "43",
                "primary_position": "5",
                "name_display_first_last": "Edwin Rios",
                "player_id": "621458"
            },
            {
                "position_txt": "C",
                "jersey_number": "67",
                "primary_position": "2",
                "name_display_first_last": "Keibert Ruiz",
                "player_id": "660688"
            },
            {
                "position_txt": "P",
                "jersey_number": "77",
                "primary_position": "1",
                "name_display_first_last": "Dennis Santana",
                "player_id": "642701"
            },
            {
                "position_txt": "P",
                "jersey_number": "76",
                "primary_position": "1",
                "name_display_first_last": "Josh Sborz",
                "player_id": "622250"
            },
            {
                "position_txt": "SS",
                "jersey_number": "5",
                "primary_position": "6",
                "name_display_first_last": "Corey Seager",
                "player_id": "608369"
            },
            {
                "position_txt": "C",
                "jersey_number": "16",
                "primary_position": "2",
                "name_display_first_last": "Will Smith",
                "player_id": "669257"
            },
            {
                "position_txt": "P",
                "jersey_number": "68",
                "primary_position": "1",
                "name_display_first_last": "Ross Stripling",
                "player_id": "548389"
            },
            {
                "position_txt": "LF",
                "jersey_number": "3",
                "primary_position": "7",
                "name_display_first_last": "Chris Taylor",
                "player_id": "621035"
            },
            {
                "position_txt": "P",
                "jersey_number": "49",
                "primary_position": "1",
                "name_display_first_last": "Blake Treinen",
                "player_id": "595014"
            },
            {
                "position_txt": "3B",
                "jersey_number": "10",
                "primary_position": "5",
                "name_display_first_last": "Justin Turner",
                "player_id": "457759"
            },
            {
                "position_txt": "P",
                "jersey_number": "7",
                "primary_position": "1",
                "name_display_first_last": "Julio Urias",
                "player_id": "628711"
            },
            {
                "position_txt": "P",
                "jersey_number": "66",
                "primary_position": "1",
                "name_display_first_last": "Mitchell White",
                "player_id": "669952"
            },
            {
                "position_txt": "P",
                "jersey_number": "57",
                "primary_position": "1",
                "name_display_first_last": "Alex Wood",
                "player_id": "622072"
            }
        ]
        return { teams, users, roster };
    }
}
