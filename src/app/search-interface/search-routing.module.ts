import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosterDisplayComponent } from './roster-display/roster-display.component';
import { HittingDisplayComponent } from './hitting-display/hitting-display.component';
import { PitchingDisplayComponent } from './pitching-display/pitching-display.component';


const searchroutes: Routes = [
  { path: 'roster', component: RosterDisplayComponent },
  { path: 'hitting', component: HittingDisplayComponent },
  { path: 'pitching', component: PitchingDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(searchroutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
