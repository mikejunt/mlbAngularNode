import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { HittingDisplayComponent } from './search-interface/hitting-display/hitting-display.component';
import { PitchingDisplayComponent } from './search-interface/pitching-display/pitching-display.component';
import { RosterDisplayComponent } from './search-interface/roster-display/roster-display.component';


const routes: Routes = [
  {
    path: 'search', component: SearchInterfaceComponent, children: [
      { path: 'hitting', component: HittingDisplayComponent },
      { path: 'pitching', component: PitchingDisplayComponent },
      { path: 'roster', component: RosterDisplayComponent },
      { path: '', redirectTo: 'roster', pathMatch: 'prefix' }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
