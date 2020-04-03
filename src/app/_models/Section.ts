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
      const {can_add_game, can_delete_game,
        can_update_game, can_add_people, can_modify_permissions, is_owner} = obj;
      this.canAddGame = (can_add_game ? true : false);
      this.canDeleteGame = (can_delete_game ? true : false);
      this.canUpdateGame = (can_update_game ? true : false);
      this.canAddPeople = (can_add_people ? true : false);
      this.canModifyPermissions = (can_modify_permissions ? true : false);
      this.isOwner = (is_owner ? true : false);
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
  this.can_add_game = canAddGame ? 1 : 0;
  this.can_delete_game = canDeleteGame ? 1 : 0;
  this.can_update_game = canUpdateGame ? 1 : 0;
  this.can_add_people = canAddPeople ? 1 : 0;
  this.can_modify_permissions = canModifyPermissions ? 1 : 0;
  this.is_owner = isOwner ? 1 : 0;
  }
  can_add_game;
  can_delete_game;
  can_update_game;
  can_add_people;
  can_modify_permissions;
  is_owner;
}