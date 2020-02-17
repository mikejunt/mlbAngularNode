import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FakeUsers } from './fakeuserdb'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userlist: Array<User> = FakeUsers
  isLoggedIn: boolean = false;
  currentUser: User
  

  constructor(private http: HttpClient, private router: Router) { }

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
      this.isLoggedIn = true;
      this.currentUser = loginattempt[0]
      this.router.navigate(['./search/'])
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['./login'])
  }

}
