import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { Play } from 'src/app/shared/models/play.model';
import { PlayService } from 'src/app/shared/services/play.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
  @Input() player;
  @Input() players: Array<Player>;
  owner;
  imgUrl = '';
  plays: Array<Play> = [];
  assists = 0;
  pts: number;
  reb: number;

  constructor(
    private playerService: PlayerService,
    private sessionService: SessionService,
    private playService: PlayService
  ) { }

  ngOnInit() {
    this.imgUrl = `url("https://cdn.basketball.sports.ws/players/png/${this.player.firstName.toLowerCase()}_${this.player.lastName.toLowerCase()}.png")`;
    this.getPlays();
  }

  isPlaying(): boolean {
    return this.player.position !== 'B';
  }

  isPlayingAs(position: string): boolean {
    return this.player.position === position;
  }

  isPosition(position: string): boolean {
    return this.players.some(player => player.position === position);
  }

  setPosition(position: string) {
    this.playerService.setPosition(this.player, position)
      .subscribe((player: Player) => {
        this.player = player;
        return player;
      });
  }

  isOwner() {
    return this.player.owner.owner === this.sessionService.user.id;
  }

  getPlays() {
    this.playService.player(this.player)
      .subscribe((plays: Array<Play>) => {
        this.plays = plays;
        this.assists = plays.reduce((acc, curr) => acc + curr.as, 0);
        this.pts = plays.reduce((acc, curr) => acc + curr.pts, 0);
        this.reb = plays.reduce((acc, curr) => acc + curr.reb, 0);
        return plays;
      });
  }

}
