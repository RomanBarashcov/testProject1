
import { combineReducers } from 'redux'

import authentification from "./authentification_reducer";
import users from "./users_reducer";
import teams from "./teams_reducer";
import notifications from "./notifications_reducer";
import myprofile from "./my_profile_reducer";

export default combineReducers({
  authentification,
  users,
  teams,
  notifications,
  myprofile
})