import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { Player } from 'src/app/shared/models/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input()team: Team;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('team', this.team);
    this.playerService.team(this.team.id)
      .subscribe((players: Array<Player>) => {
        console.log(players);
      });
  }

}
