import loadUsers from "./loda_users_action";
import loadTemas from "./load_teams_action";
import loadNorifications from "./load_notifications_action";
import login from "./login_action";

export default Object.assign({},
	{loadUsers},
	{loadTemas},
    {loadNorifications},
    {login}
);