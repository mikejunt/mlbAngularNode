import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { SortTeamPipe } from './pipes/sort-team.pipe';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { SearchDisplayComponent } from './search-display/search-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserheaderComponent,
    SortTeamPipe,
    SearchInterfaceComponent,
    SearchDisplayComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }