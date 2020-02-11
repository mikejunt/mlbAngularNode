import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userlist: Array<User> = [
    {username: "Mike", password: "password", favteam: "119" }, 
    {username: "Sarah", password: "password", favteam: "134" }, 
    {username: "Justin", password: "password", favteam: "137" }]

  constructor() { }

  authenticate (username: string, password: string) {
    let loginattempt = this.userlist.filter(obj => obj.username === username && obj.password === password);
    console.log(loginattempt)
    if (loginattempt.length !== 1) {
      console.log("Username or password incorrect.")
    }
    else {
      localStorage.setItem("username", `${loginattempt[0]["username"]}`);
      localStorage.setItem("favteam", `${loginattempt[0]["favteam"]}`)
      console.log(localStorage)
      console.log("Successful login things like localStorage & redirect should happen now.")
    }
  }
}
