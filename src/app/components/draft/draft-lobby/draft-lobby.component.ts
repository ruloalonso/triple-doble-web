import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-lobby',
  templateUrl: './draft-lobby.component.html',
  styleUrls: ['./draft-lobby.component.css']
})
export class DraftLobbyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  canDeactivate(): boolean {
    return window.confirm('Are you sure?');
  }

}
