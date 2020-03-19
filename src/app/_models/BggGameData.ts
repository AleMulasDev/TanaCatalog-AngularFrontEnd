export class BggGameData {
  constructor(boardgame?) {
    if (!boardgame) {
      return;
    }
    if (boardgame.name) {
      this.name = boardgame.name[0]._ ? boardgame.name[0]._ : boardgame.name;
    }
    if (boardgame.$ && boardgame.$.objectid) {
      this.objectid = boardgame.$.objectid;
    }
    if (boardgame.minplayers) {
      this.minPlayer = boardgame.minPlayer;
    }
    if (boardgame.maxplayers) {
      this.maxPlayer = boardgame.maxPlayer;
    }
    if (boardgame.players) {
      this.player = boardgame.players;
    } else {
      this.player = `${this.minPlayer || ''}/${this.maxPlayer || ''}`;
    }
    if (boardgame.minplaytime) {
      this.minPlaytime = boardgame.minplaytime;
    }
    if (boardgame.maxplaytime) {
      this.maxPlaytime = boardgame.maxplaytime;
    }
    if (boardgame.playingtime) {
      this.playingTime = boardgame.playingTime;
    }
    if (boardgame.age) {
      this.age = boardgame.age.join(',');
    }
    if (boardgame.description) {
      this.description = boardgame.description;
    }
    if (boardgame.thumbnail) {
      if(Array.isArray(boardgame.thumbnail)) {
        this.thumbnailURI = boardgame.thumbnail[0];
      } else {
        this.thumbnailURI = boardgame.thumbnail._ ? boardgame.thumbnail._ : boardgame.thumbnail;
      }
    }
    if (boardgame.image) {
      this.imageURI = boardgame.image;
    }
  }
  objectid: string;
  name: string;

  minPlayer: string;
  maxPlayer: string;
  player: string;

  minPlaytime: string;
  maxPlaytime: string;
  playingTime: string;

  age: string;
  description: string;
  imageURI: string;
  thumbnailURI: string;
}
