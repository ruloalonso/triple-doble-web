import { Team } from './../../../shared/models/team.model';
import { TeamService } from './../../../shared/services/team.service';
import { Router } from '@angular/router';
import { LeagueService, } from './../../../shared/services/league.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { League } from '../../../shared/models/league.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  userLeagues: Array<League> = [];
  otherLeagues: Array<League> = [];
  onLeagueChanges: Subscription;

  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.leagueService.list()
      .subscribe(
        (leagues: Array<League>) => {
          this.userLeagues = leagues.filter(league => league.users.includes(this.sessionService.user.id));
          this.otherLeagues = leagues.filter(league => !league.users.includes(this.sessionService.user.id));
        }
      );
    this.onLeagueChanges = this.leagueService.onLeaguesChanges()
      .subscribe((leagues: Array<League>) => {
        this.userLeagues = leagues.filter(league => league.users.includes(this.sessionService.user.id));
        this.otherLeagues = leagues.filter(league => !league.users.includes(this.sessionService.user.id));
      });
  }

  ngOnDestroy(): void {
    this.onLeagueChanges.unsubscribe();
  }

  createLeague() {
    this.leagueService.create()
      .subscribe(
        (league: League) => {
          this.teamService.create(league._id)
            .subscribe((team: Team) => {
              this.router.navigate([`/leagues/${league._id}/lobby`])
            })
        }
      );
  }
}