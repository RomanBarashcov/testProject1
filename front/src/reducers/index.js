
import { combineReducers } from 'redux'

import authentification from "./authentification_reducer";
import users from "./users_reducer";
import userInfo from "./user_info_reducer";
import teams from "./teams_reducer";
import teamInfo from "./team_info_reducer";
import notifications from "./notifications_reducer";
import myProfile from "./my_profile_reducer";
import notificationTypes from "./notification_types_reduser";

const rootReducer =  combineReducers({
  authentification,
  users,
  userInfo,
  teams,
  teamInfo,
  notifications,
  myProfile,
  notificationTypes
});

export default rootReducer;