import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { HittingDisplayComponent } from './search-interface/hitting-display/hitting-display.component';
import { PitchingDisplayComponent } from './search-interface/pitching-display/pitching-display.component';
import { TeamRosterComponent } from './team-landing/team-roster/team-roster.component';
import { TrxDisplayComponent } from './search-interface/trx-display/trx-display.component';
import { LoginGuard } from './guards/login.guard';
import { TeamLandingComponent } from './team-landing/team-landing.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {
    path: 'search', component: SearchInterfaceComponent, canActivate: [LoginGuard], children: [
      { path: 'hitting', component: HittingDisplayComponent },
      { path: 'pitching', component: PitchingDisplayComponent },
      { path: 'landing', component: TeamLandingComponent },
      { path: 'alltrans', component: TrxDisplayComponent },
      { path: '', redirectTo: 'landing', pathMatch: 'prefix' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
