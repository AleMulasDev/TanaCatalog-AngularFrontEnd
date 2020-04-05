export class Section {
  constructor({id, title, isOwner}) {
    this.id = id;
    this.title = title;
    this.isOwner = isOwner;
  }
  id;
  title;
  isOwner;
}

export class SectionUser {
  constructor(obj?) {
    if (obj) {
      const {userID, name, email, permission} = obj;
      this.userID = userID;
      this.name = name;
      this.email = email;
      if (permission.can_add_game === undefined) {
        // TODO Fix this mess
        this.permission = new UserPermission(new AddUserPermission(permission));
      } else {
        this.permission = new UserPermission(permission);
      }
    } else {
      this.permission = new UserPermission();
    }
  }
  userID;
  name;
  email;
  permission: UserPermission;
}

export class UserPermission {
  constructor(obj?) {
    if (obj) {
      const {canAddGame, canDeleteGame,
        canUpdateGame, canAddPeople, canModifyPermissions, isOwner} = obj;
      this.canAddGame = (canAddGame ? true : false);
      this.canDeleteGame = (canDeleteGame ? true : false);
      this.canUpdateGame = (canUpdateGame ? true : false);
      this.canAddPeople = (canAddPeople ? true : false);
      this.canModifyPermissions = (canModifyPermissions ? true : false);
      this.isOwner = (isOwner ? true : false);
    } else {
      this.canAddGame = false;
      this.canDeleteGame = false;
      this.canUpdateGame = false;
      this.canAddPeople = false;
      this.canModifyPermissions = false;
      this.isOwner = false;
    }
  }
  canAddGame;
  canDeleteGame;
  canUpdateGame;
  canAddPeople;
  canModifyPermissions;
  isOwner;
}

export class AddUserPermission {
  constructor({canAddGame, canDeleteGame, canUpdateGame, canAddPeople, canModifyPermissions,
    isOwner}) {
  this.canAddGame = canAddGame ? 1 : 0;
  this.canDeleteGame = canDeleteGame ? 1 : 0;
  this.canUpdateGame = canUpdateGame ? 1 : 0;
  this.canAddPeople = canAddPeople ? 1 : 0;
  this.canModifyPermissions = canModifyPermissions ? 1 : 0;
  this.isOwner = isOwner ? 1 : 0;
  }
  canAddGame;
  canDeleteGame;
  canUpdateGame;
  canAddPeople;
  canModifyPermissions;
  isOwner;
}