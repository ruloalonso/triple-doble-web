import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';
import { SessionService } from 'src/app/shared/services/session.service';

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

  constructor(
    private playerService: PlayerService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.imgUrl = `url("https://cdn.basketball.sports.ws/players/png/${this.player.firstName.toLowerCase()}_${this.player.lastName.toLowerCase()}.png")`;
  }

  isPlaying(): boolean {
    return this.player.position !== 'B';
  }

  isPosition(position: string): boolean {
    // console.log(position);
    console.log(this.players);
    console.log('is position', this.players.some(player => player.position === position));
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

}
