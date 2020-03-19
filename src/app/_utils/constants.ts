const SERVER_ADDRESS  = `http://localhost:4000`;
const BASE_PATH = `${SERVER_ADDRESS}/api/tana`;
const BASE_PATH_USERS = `${BASE_PATH}/users`;
const LOGIN_PATH = `${BASE_PATH_USERS}/login`;
const REGISTER_PATH = `${BASE_PATH_USERS}/register`;
const RECOVER_PATH = `${BASE_PATH_USERS}/recover`;
const VERIFY_PATH = `${BASE_PATH_USERS}/verify`;
const CHANGE_PATH = `${BASE_PATH_USERS}/change`;
const CHANGE_EMAIL_PATH = `${BASE_PATH_USERS}/changeEmail`;

const BASE_PATH_GAMES = `${BASE_PATH}/games`;
const SEARCHBGG_GAME_PATH = `${BASE_PATH}/searchBgg`;
const FETCHBGG_GAME_PATH = `${BASE_PATH}/fetchBgg`;

const APP_ADDRESS = `http://localhost:4200`;
const APP_LOGIN_PATH = `${APP_ADDRESS}/login`;
const APP_RECOVER_PATH = `${APP_ADDRESS}/recover`;
const APP_CHANGEPASS_PATH = `${APP_ADDRESS}/changePassword`;
const APP_AFTERLOGIN_CHANGEPASS = `${APP_ADDRESS}/login?redirect=changePassword`;



export const constant  = {
  server: {
    SERVER_ADDRESS,
    BASE_PATH,
    BASE_PATH_USERS,
    LOGIN_PATH,
    REGISTER_PATH,
    RECOVER_PATH,
    VERIFY_PATH,
    CHANGE_PATH,
    CHANGE_EMAIL_PATH,
    BASE_PATH_GAMES,
    SEARCHBGG_GAME_PATH,
    FETCHBGG_GAME_PATH
  },
  client: {
    APP_ADDRESS,
    APP_LOGIN_PATH,
    APP_RECOVER_PATH,
    APP_CHANGEPASS_PATH,
    APP_AFTERLOGIN_CHANGEPASS
  }
};
