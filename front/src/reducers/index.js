
import { combineReducers } from 'redux'

import authentification from "./authentification_reducer";
import users from "./users_reducer";
import userInfo from "./user_info_reducer";
import teams from "./teams_reducer";
import teamInfo from "./team_info_reducer";
import notifications from "./notifications_reducer";
import myprofile from "./my_profile_reducer";

const rootReducer =  combineReducers({
  authentification,
  users,
  userInfo,
  teams,
  teamInfo,
  notifications,
  myprofile
});

export default rootReducer;