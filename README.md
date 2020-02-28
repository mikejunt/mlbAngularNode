This is my first major project in Angular, begun as a student at the Midland University Code Academy.  It utilizes Angular 9, ngrx/store, and design elements from Angular Material and Bootstrap.  It queries Major League Baseball statistics from the MLB Advanced Media API and displays them like a contemporary sports website, ranging from team and transaction information to player statistics.   This project originated as an API assignment outside of Angular which I began converting into Angular for practice.   

The next stretch goals for this project are:

* ~Convert the team color schemes to Angular Material Custom Themes & Configure the app to toggle theme appropriately based on team/player being viewed, or defaulting to the user's favorite team.   This is currently accomplished via simple css & ngClass and does not look very good or play well with Angular Material.~

* Conversion to Themes is complete, but now more styling will be necessary.

* When we learn some sort of back-end technology, move the API queries there and store responses in a database that allows for local filtration.   Current direct API-to-browser process is flawed due to the enormous size of query responses (JSON upwards of 1.8mb), and filtration must be done via Angular Pipes.   Using a backend technology would allow for filtered queries, resulting in less memory use, better performance, and significant aesthetic improvements such as the ability to integrate Material Table pagination or sort.   

* Once this exists, new features could be considered such as player profile pages.   The API is not friendly to this currently (requiring statistics to be requested in either 'all players in a given season' or 'one single player for one specific season' format; this would result in excessive API queries and response time without some sort of back-end storage to hold old season information.

The information and statistics presented within this application are either sourced directly or derived from other information received via the Major League Baseball API distributed by MLB Advanced Media and are subject to their copyright terms found at http://gdx.mlb.com/components/copyright.txt.   

