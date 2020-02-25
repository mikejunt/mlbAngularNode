import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Selectors from '../store/selectors'
import { Team } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  constructor (private store: Store<AppState>, private router: Router) {this.teamlist$ = this.store.select(Selectors.viewTeams);
  this.teamlist$.subscribe(res => this.teamlist = res) }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.teamlist.length === 0) {this.router.navigate(['login/']);return false}
    else return true
  }
  
}
