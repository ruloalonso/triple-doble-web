import { League } from './../../../shared/models/league.model';
import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.css']
})
export class LeagueItemComponent implements OnInit {
  @Input() league: League = new League();

  constructor() { }

  ngOnInit() {
  }

}
