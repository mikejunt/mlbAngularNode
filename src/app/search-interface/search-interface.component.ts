import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam:string = this.user.currentUser.favteam;
  teamlist = [...this.api.teamlist];
  

  constructor(private user: UserService, private api: ApidataService) { }

  ngOnInit(): void {
  }

}
