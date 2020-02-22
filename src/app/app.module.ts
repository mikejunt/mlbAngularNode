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
import { RosterDisplayComponent } from './search-interface/roster-display/roster-display.component';
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
import { CopyrightPipe } from './pipes/copyright.pipe'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserheaderComponent,
    SortTeamPipe,
    SearchInterfaceComponent,
    RosterDisplayComponent,
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
