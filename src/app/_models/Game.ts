import { BggGameData } from './bggGameData';

export class Game {
  constructor(data?: BggGameData) {
    if (!data) {
      return;
    }
    if (data.name) {
      this.title = data.name;
    }
    if (data.description) {
      this.description = data.description;
    }
    if (data.objectid) {
      this.gamebgg_id = data.objectid;
    }
    if (data.player) {
      this.players = data.player;
    }
    if (data.playingTime) {
      this.playtime = data.playingTime;
    }
    if (data.age) {
      this.age = data.age;
    }
    if (data.imageURI) {
      this.image = data.imageURI;
    }
  }
  id;
  description;
  title;
  link_tdg;
  players;
  playtime;
  age;
  gamebgg_id;
  image;
  thumbnail;
  price;
  canUpdateGame: string;
  isOwner;
  canEdit;
  owner;
}

export class GamePermission {
  name;
  ownerID;
  gameID;
  canUpdateGame;
}