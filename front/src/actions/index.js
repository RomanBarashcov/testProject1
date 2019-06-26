import loadUsers from "./load_users_action";
import loadUserInfo from "./load_user_info_action";
import userTeamChange from "./user_team_change_action";
import loadTeams from "./load_teams_action";
import loadTeamInfo from "./load_team_info_action";
import loadNotifications from "./load_notifications_action";
import logIn from "./login_action";

export default Object.assign({},
    {loadUsers},
    {loadUserInfo},
    {userTeamChange},
    {loadTeams},
    {loadTeamInfo},
    {loadNotifications},
    {logIn}
);