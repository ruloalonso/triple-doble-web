import { Team } from './../../../shared/models/team.model';
import { TeamService } from './../../../shared/services/team.service';
import { Router } from '@angular/router';
import { LeagueService, } from './../../../shared/services/league.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { League } from '../../../shared/models/league.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  private static readonly POLLING_INTERVAL = 5000;
  leagues: Array<League> = [];
  onLeagueChanges: Subscription;
  pollingIntervalSubscription: Subscription;
  leagueName: string;

  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.leagueService.leave();
    this.pollingIntervalSubscription = interval(LeagueListComponent.POLLING_INTERVAL)
      .pipe(
        startWith(0),
        switchMap(() => this.leagueService.list())
      )
      .subscribe((leagues: Array<League>) => {
        this.leagues = leagues;
      });
    this.onLeagueChanges = this.leagueService.onLeaguesChanges()
      .subscribe((leagues: Array<League>) => {
        this.leagues = leagues;
        //TODO: league pipe
        // this.userLeagues = leagues.filter(league => league.users.includes(this.sessionService.user.id));
        // this.otherLeagues = leagues.filter(league => !league.users.includes(this.sessionService.user.id));
      });
  }

  ngOnDestroy(): void {
    this.onLeagueChanges.unsubscribe();
    this.pollingIntervalSubscription.unsubscribe();
  }

  createLeague() {
    console.log(this.leagueName);
    this.leagueService.create(this.leagueName)
      .subscribe(
        (league: League) => {
          this.teamService.create(league._id)
            .subscribe((team: Team) => {
              this.router.navigate([`/leagues/${league._id}/lobby`])
            });
        }
      );
  }
}