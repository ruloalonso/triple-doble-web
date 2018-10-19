import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Team } from 'src/app/shared/models/team.model';
import { Player } from 'src/app/shared/models/player.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input()team: Team;
  players: Array<Player>;
  onPlayersChanges: Subscription;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.playerService.team(this.team._id)
      .subscribe((players: Array<Player>) => {
        this.players = players;
      });
    this.onPlayersChanges = this.playerService.onPlayersChanges()
      .subscribe((players: Array<Player>) => {
        this.players = players;
      });
  }

  getPosition(position: string) {
    this.players.forEach(player => {
      if (player.owner._id === this.team._id) {
        return {
          player: player,
          isOwner: true
        };
      }
    });
    return this.players.filter(player => player.position === position);
  }

  isAPosition(position: string) {
    return this.players.some(player => player.position === position);
  }

}
