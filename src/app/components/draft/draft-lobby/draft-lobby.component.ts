import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { League } from 'src/app/shared/models/league.model';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-draft-lobby',
  templateUrl: './draft-lobby.component.html',
  styleUrls: ['./draft-lobby.component.css']
})
export class DraftLobbyComponent implements OnInit {
  league: League = new League();
  leagueId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
      this.leagueService.get(this.leagueId)
        .subscribe((newLeague: League) => this.league = newLeague);
    });
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
      console.log('start draft!');
      this.leagueService.startDraft(this.leagueId)
        .subscribe(league => {
          this.router.navigate(['/leagues', this.leagueId, 'draft']);
        });
    }
  }

}
