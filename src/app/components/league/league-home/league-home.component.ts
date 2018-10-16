import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/shared/services/league.service';
import { League } from 'src/app/shared/models/league.model';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-home',
  templateUrl: './league-home.component.html',
  styleUrls: ['./league-home.component.css']
})
export class LeagueHomeComponent implements OnInit {
  league: League = new League();

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.league._id = params.leagueId);
    this.leagueService.get(this.league._id)
      .subscribe((league: League) => {
        //console.log(this.league);
        this.league = league;
      });
  }

}
