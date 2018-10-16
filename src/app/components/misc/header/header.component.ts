import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { League } from 'src/app/shared/models/league.model';
import { LeagueService } from 'src/app/shared/services/league.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user: User;
  league: League;
  onUserChanges: Subscription;
  onLeagueChanges: Subscription;

  constructor(
    private sessionService: SessionService,
    private leagueService: LeagueService,
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
  }

  onClickLogout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
