import { User } from "./user";

export interface Profiles {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export class Profiles implements Profiles {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
