To Do List:

Recent Transaction Display:
// * Configure API call and save to store //
// * configure basic query for trailing 7 days information on login //
* Create sort-by-team pipe (starting OR finishing team is selected team
* Create transaction summary component for landing page (w/ secondary routing)

Create Footer
// * Pass Copyright info into store //
* create footer & import copyright (may need display pipe)

Create "Leaders" display components
* Angular Material Tabs, 3 stats per type
* Create custom "Select top 5" pipe
* Create secondary-named routing for both components

Configure Final Landing Page: Team Profile
* Displays Roster40, Recent Transactions, Hitting & Pitching Leaders, Team information
* Is the landing page of Secondary Routing
* Search component remains above header; selecting and activating navigates child routing away to appropriate search display component (pitcher, hitter, potentially expanded trx w/ datepicker)
* Utilize team information from Teamlist
* Standings? --- may not be in API
* Broadcast Information? -- is in API, but not clear if it works until regular season

Build out options menus for search:
* Add minimum IP/PA
* Add alternative all-players query (not team specific), with optional positional selector (eg 1b)
* Angular Material expansion panels & menus

Build out improved display for search results:
* Pagination
* Header sort

Implement a Signup Screen
* Move fake DB back inline so new user information can be pushed into array after signup
* accomplish form verification goals

Re-implement AuthGuard

Stretch:

* Angular Material Custom Theming: use 30 material Themes for team coloration, assign favteam theme to main widget & curteam theme to child routing; default back to favteam theme during non-team searching.

