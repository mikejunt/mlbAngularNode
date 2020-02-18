import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../interfaces/player.interface';

@Component({
  selector: 'app-roster-display',
  templateUrl: './roster-display.component.html',
  styleUrls: ['./roster-display.component.scss']
})
export class RosterDisplayComponent implements OnInit {
@Input('roster') roster: Array<Player>;
@Input('searchmode') searchmode: string;

  constructor() { }

  ngOnInit(): void {
  }

}
