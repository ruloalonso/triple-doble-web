import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/shared/services/team.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Player } from 'src/app/shared/models/player.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-marketplace',
  templateUrl: './league-marketplace.component.html',
  styleUrls: ['./league-marketplace.component.css']
})
export class LeagueMarketplaceComponent implements OnInit {
  leagueId: string;
  players: Array<Player> = [];
  freeAgents: Array<Player>;
  playerIdToCut: string;
  freeAgentId: string;
  signCheck: string;
  cutCheck: string;
  onPlayersChanges: Subscription;
  onAvailablePlayersChanges: Subscription;


  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
      this.teamService.list(this.leagueId)
        .subscribe((teams: Array<Team>) => {
          teams.forEach((team: Team) => {
            if (team.owner.id === this.sessionService.user.id) {
              this.playerService.team(team._id)
                .subscribe((players: Array<Player>) => {
                  this.players = players;
                });
              this.onPlayersChanges = this.playerService.onPlayersChanges()
                .subscribe((players: Array<Player>) => {
                  this.players = players;
                });
              this.playerService.listAvailable()
                .subscribe((players: Array<Player>) => {
                  this.freeAgents = players;
                });
              this.onAvailablePlayersChanges = this.playerService.onAvailablePlayersChanges()
                .subscribe((players: Array<Player>) => {
                  this.freeAgents = players;
                });
            }
          });
        });
    });
  }

  cutPlayer() {
    this.playerService.cut(this.playerIdToCut)
      .subscribe((player: Player) => {
        this.cutCheck = 'ok!';
      });
  }

  signPlayer() {
    this.playerService.sign(this.freeAgentId, this.leagueId)
      .subscribe((player: Player) => {
        this.signCheck = 'ok!';
      });
  }

  hasSpace() {
    return this.players.length < 4;
  }

}
