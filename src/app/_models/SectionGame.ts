export class SectionGames {
  constructor(obj?) {
    if (obj) {
      const {id, gameID, sectionID, holderID, isNew, acquisitionDate, origin, propriety, holderTitle, gameTitle} = obj;
      this.id = id;
      this.gameID = gameID;
      this.sectionID = sectionID;
      this.holderID = holderID;
      this.isNew = isNew ? true : false;
      this.acquisitionDate = acquisitionDate.slice(
        0, acquisitionDate.indexOf('T'));
      this.origin = origin;
      this.propriety = propriety;
      this.holderTitle = holderTitle;
      this.gameTitle = gameTitle;
    } else {
      this.isNew = false;
      this.acquisitionDate = new Date().toISOString();
      this.origin = '';
      this.propriety = '';
      this.holderTitle = '';
      this.gameTitle = '';
    }
  }
  id;
  gameID;
  sectionID;
  holderID;
  isNew;
  acquisitionDate;
  origin;
  propriety;
  holderTitle;
  gameTitle;
}

export class SectionGamesToAdd {
  constructor(obj?) {
    if (obj) {
      if (obj.id) {
        const {id} = obj;
        this.id = id;
      }
      const {gameID, sectionID, holderID, isNew, acquisitionDate, origin, propriety} = obj;
      this.gameID = gameID;
      this.sectionID = sectionID;
      this.holderID = holderID;
      this.isNew = isNew ? 1 : 0;
      this.acquisitionDate = acquisitionDate;
      this.origin = origin;
      this.propriety = propriety;
    }
  }
  id;
  gameID;
  sectionID;
  holderID;
  isNew;
  acquisitionDate;
  origin;
  propriety;

  get() {
    if (this.id) {
      return this;
    } else {
      let obj = {
        gameID: this.gameID,
        sectionID : this.sectionID,
        holderID : this.holderID,
        isNew : this.isNew,
        acquisitionDate : this.acquisitionDate,
        origin : this.origin,
        propriety : this.propriety
      };
      return obj;
    }
  }
}
