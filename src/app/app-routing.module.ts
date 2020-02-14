import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserheaderComponent } from './userheader/userheader.component';


const routes: Routes = [
  {path: 'header', component: UserheaderComponent},
  {path: "**", component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
