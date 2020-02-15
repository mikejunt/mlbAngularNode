import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../interfaces/player.interface';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent implements OnInit {
@Input('roster') roster: Array<Player>;
@Input('searchmode') searchmode: string;

  constructor() { }

  ngOnInit(): void {
  }

}
