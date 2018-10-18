import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Team } from 'src/app/shared/models/team.model';
import { Player } from 'src/app/shared/models/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input()team: Team;
  players: Array<Player>;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.playerService.team(this.team._id)
      .subscribe((players: Array<Player>) => {
        this.players = players;
      });
  }

}
