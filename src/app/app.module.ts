import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { SortTeamPipe } from './pipes/sort-team.pipe';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { TeamRosterComponent } from './team-landing/team-roster/team-roster.component';
import { SortRosterPipe } from './pipes/sort-roster.pipe';
import { RosterPositionPipe } from './pipes/roster-position.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materialModule';
import { HittingDisplayComponent } from './search-interface/hitting-display/hitting-display.component';
import { PitchingDisplayComponent } from './search-interface/pitching-display/pitching-display.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { NameFirstLastPipe } from './pipes/name-first-last.pipe';
import { MinplatePipe } from './pipes/minplate.pipe';
import { MinipPipe } from './pipes/minip.pipe';
import { PlayerbyteamPipe } from './pipes/playerbyteam.pipe';
import { PlayerbyposPipe } from './pipes/playerbypos.pipe';
import { TeamtrxPipe } from './pipes/teamtrx.pipe';
import { TrxDisplayComponent } from './search-interface/trx-display/trx-display.component';
import { UserfooterComponent } from './userfooter/userfooter.component';
import { CopyrightPipe } from './pipes/copyright.pipe';
import { LeadersDescPipe } from './pipes/leaders-desc.pipe';
import { NodupetrxPipe } from './pipes/nodupetrx.pipe';
import { TeamLandingComponent } from './team-landing/team-landing.component';
import { TeamTrxComponent } from './team-landing/team-trx/team-trx.component';
import { TeamHitLeadersComponent } from './team-landing/team-hit-leaders/team-hit-leaders.component';
import { TeamScheduleComponent } from './team-landing/team-schedule/team-schedule.component';
import { TeamPitchLeadersComponent } from './team-landing/team-pitch-leaders/team-pitch-leaders.component';
import { TeamDescComponent } from './team-landing/team-desc/team-desc.component';
import { LeadersAscPipe } from './pipes/leaders-asc.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserheaderComponent,
    SortTeamPipe,
    SearchInterfaceComponent,
    TeamRosterComponent,
    SortRosterPipe,
    RosterPositionPipe,
    HittingDisplayComponent,
    PitchingDisplayComponent,
    NameFirstLastPipe,
    MinplatePipe,
    MinipPipe,
    PlayerbyteamPipe,
    PlayerbyposPipe,
    TeamtrxPipe,
    TrxDisplayComponent,
    UserfooterComponent,
    CopyrightPipe,
    LeadersDescPipe,
    NodupetrxPipe,
    TeamLandingComponent,
    TeamTrxComponent,
    TeamHitLeadersComponent,
    TeamScheduleComponent,
    TeamPitchLeadersComponent,
    TeamDescComponent,
    LeadersAscPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
