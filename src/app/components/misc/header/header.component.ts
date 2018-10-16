import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { League } from 'src/app/shared/models/league.model';
import { LeagueService } from 'src/app/shared/services/league.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user: User;
  league: League;
  team: Team;
  onUserChanges: Subscription;
  onLeagueChanges: Subscription;
  onTeamChanges: Subscription;

  constructor(
    private sessionService: SessionService,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.sessionService.user;
    this.onUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => {
        this.user = user;
      });
    this.league = this.leagueService.league;
    this.onLeagueChanges = this.leagueService.onLeagueChanges()
      .subscribe((league: League) => {
        this.league = league;
    });
    this.team = this.teamService.team;
    this.onTeamChanges = this.teamService.onTeamChanges()
      .subscribe((team: Team) => {
        this.team = team;
    });

  }

  onClickLogout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  isSeason(): boolean {
    if (this.league) {
      //console.log(this.league);
      return this.league.status === 'season';
    }
    return false;
  }
}
