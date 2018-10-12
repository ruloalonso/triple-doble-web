import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LeagueService } from 'src/app/shared/services/league.service';
import { League } from 'src/app/shared/models/league.model';
import { Observable } from 'rxjs';

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
    private leagueService: LeagueService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
    })
  }

  canDeactivate(): boolean {
    return window.confirm('Are you sure?');
  }

  startDraft(): void {
    this.router.navigate(['/leagues', this.leagueId, 'draft']);
  }

}
