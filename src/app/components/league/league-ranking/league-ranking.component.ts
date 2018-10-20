import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-ranking',
  templateUrl: './league-ranking.component.html',
  styleUrls: ['./league-ranking.component.css']
})
export class LeagueRankingComponent implements OnInit {
  teams: Array<Team>  = [];
  leagueId: string;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.leagueId = params.leagueId);
    this.teamService.list(this.leagueId)
      .subscribe((teams: Array<Team>) => {
        this.teams = teams;
      });
  }

  compare(a: Team, b: Team): number {
   return b.fp - a.fp;
  }

}
