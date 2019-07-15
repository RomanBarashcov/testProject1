import loadUsers from "./load_users_action";
import loadUserInfo from "./load_user_info_action";
import loadCurrentUser from "./load_current_user_action";
import loadStates from "./load_states_action";
import loadRoles from "./load_roles_action";
import userUpdate from "./user_update_action";
import userLiveTeam from "./live_from_team_action";
import blockingUser from "./blocking_user_action";
import unblockingUser from "./unblocking_user_action";
import loadTeams from "./load_teams_action";
import loadTeamInfo from "./load_team_info_action";
import loadNotifications from "./load_notifications_action";
import logIn from "./login_action";
import registrate from "./registrate_action";

export default Object.assign({},
    {loadUsers},
    {loadUserInfo},
    {loadCurrentUser},
    {loadStates},
    {loadRoles},
    {userUpdate},
    {userLiveTeam},
    {blockingUser},
    {unblockingUser},
    {loadTeams},
    {loadTeamInfo},
    {loadNotifications},
    {logIn},
    {registrate}
);