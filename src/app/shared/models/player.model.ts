import { Team } from './team.model';

export class Player {
  _id: string;
  playerId: string;
  firstName: string;
  lastName: string;
  team: string;
  owner?: Team;
  image?: string;
  position: string;
  fp: number;
}
