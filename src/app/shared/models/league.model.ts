import { User } from './user.model';

export class League {
  name: string;
  _id: string;
  admin: User;
  users: [User];
  status: string;
  round: string;
  turn: number;
  maxUsers: number;
  maxPlayers: number;
}
