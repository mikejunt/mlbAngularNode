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
import { MaterialModule } from './materialModule'

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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
