import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FakeUsers } from '../fakeuserdb'
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userlist: Array<User> = FakeUsers
  isLoggedIn: boolean = false;
  currentUser: User
  

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  // };

  // getUserlist() {
  //   this.getUsers().subscribe(userlist => this.userlist = userlist)
  // }

  // getSpecificUser(id: number) {
  //   const url = `${this.usersUrl}/${id}`;
  //   return this.http.get(url)
  // }

  authenticate(username: string, password: string) {
    let loginattempt = this.userlist.filter(obj => obj.username === username && obj.password === password);
    if (loginattempt.length !== 1) { }
    else {
      let username = loginattempt[0]["username"];let favteam = loginattempt[0]["favteam"];
      this.store.dispatch(Actions.login({user: {username: username, favteam: favteam}}))
      this.store.dispatch(Actions.setViewTeam({displayteam: favteam}))
      this.router.navigate(['search'])
    }
  }

  logout() {
    this.store.dispatch(Actions.logout());
    this.router.navigate(['login'])
  }

}
