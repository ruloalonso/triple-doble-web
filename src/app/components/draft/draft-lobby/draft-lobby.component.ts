import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { League } from 'src/app/shared/models/league.model';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { interval } from "rxjs/internal/observable/interval";
import { switchMap, startWith } from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-draft-lobby',
  templateUrl: './draft-lobby.component.html',
  styleUrls: ['./draft-lobby.component.css']
})
export class DraftLobbyComponent implements OnInit, OnDestroy {
  private static readonly POLLING_INTERVAL = 2000;
  league: League = new League();
  leagueId: string;
  pollingIntervalSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;

      this.pollingIntervalSubscription = interval(DraftLobbyComponent.POLLING_INTERVAL)
        .pipe(
          startWith(0),
          switchMap(() => this.leagueService.get(this.leagueId))
        )
        .subscribe((league: League) => {
          this.league = league;
          if (!this.isWaiting() && this.isAdmin()) {
            this.pollingIntervalSubscription.unsubscribe();
          }
          console.log(league);
          if (league.status === "draft") {
            this.pollingIntervalSubscription.unsubscribe();
            this.router.navigate(['/leagues', league._id, 'draft']);
          }
        });
    });
  }

  ngOnDestroy() {
    this.pollingIntervalSubscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return window.confirm('Are you sure?');
  }

  isAdmin(): boolean {
    return this.sessionService.user.id === this.league.admin;
  }

  isWaiting(): boolean {
    return (this.league.maxUsers - this.league.users.length) > 0;
  }

  startDraft(): void {
    if (this.league.users.length === this.league.maxUsers) {
      this.leagueService.startDraft(this.leagueId)
        .subscribe(league => {
          this.router.navigate(['/leagues', this.leagueId, 'draft']);
        });
    }
  }

}
