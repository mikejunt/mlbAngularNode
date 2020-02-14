import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  curteam = ""
  teamlist = []
  

  constructor(private user: UserService, private api: ApidataService) {this.curteam = this.user.currentUser.favteam }

  ngOnInit(): void {this.teamlist = [...this.api.teamlist];
  }

}
