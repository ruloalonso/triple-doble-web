import { User } from './user.model';

export class Team {
  id?: string;
  name: string;
  city: string;
  owner: User;
  league: string;
}
