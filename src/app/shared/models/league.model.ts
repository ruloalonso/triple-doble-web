export class League {
  _id: string;
  admin: string;
  users: [string];
  status: string;
  round: string;
  turn: number;
  maxUsers: number;
  maxPlayers: number;
}
