import { LeagueService, } from './../../../shared/services/league.service';
import { Component, OnInit } from '@angular/core';
import { League } from '../../../shared/models/league.model';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  leagues: Array<League> = [];

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagueService.list()
      .subscribe(
        (leagues: League[]) => {
          this.leagues = leagues;
          console.log(this.leagues);
        }
      );
  }

}
