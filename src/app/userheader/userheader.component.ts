import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';

import { Team } from '../interfaces/team.interface';
import * as Selectors from  '../store/selectors';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  username$: Observable<string>;
  
  constructor(private user: UserService, private staticquery: StaticqueryService, 
    private store: Store<AppState>) {
      this.username$ = this.store.pipe(select(Selectors.viewUserName))
   }

  ngOnInit(): void { }

  logout() {this.user.logout()}  

}
