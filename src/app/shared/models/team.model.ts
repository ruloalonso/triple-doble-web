import { User } from './user.model';

export class Team {
  _id: string;
  name: string;
  city: string;
  owner: User;
  league: string;
}
