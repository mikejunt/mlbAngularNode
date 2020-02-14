import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';


const routes: Routes = [
  {path: 'search', component: SearchInterfaceComponent},
  {path: "**", component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
