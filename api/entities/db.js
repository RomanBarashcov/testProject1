"use strict"

const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    dialect: config.db.dialect,
    host: config.db.host,
    define: {   
        timestamps: false
    }
});

var db = {};

db.Notification = require("./notification")(sequelize, Sequelize);
db.NotificationType = require("./notification_type")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.State = require("./state")(sequelize, Sequelize);
db.TeamUserMap = require("./team_users_map")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.State = require("./state")(sequelize, Sequelize);
db.UserBlocked = require("./user_blocked")(sequelize, Sequelize);

db.sync = () => sequelize.sync();

db.init = async () => {
    await db.Role.create([{name: "admin"}, {name: "manager"}, {name: "player"}]);
    await db.State.create([{name: "pending"}, {name: "approve"}, {name: "disapprove"}]);
    await db.Team.create([{name: "Team A", description: "Team A ... from ... and ...", total_score: 0}, 
        {name: "Team B", description: "Team B ... from ... and ...", total_score: 0}]
    );

    let role = db.Role.findOne({name: "admin"});
    let state = db.State.findOne({name: "approve"});

    let admin = {name: "Some Admin", email: "admin@mail.com", state: state.id, role: role.id }
    await db.User()
}
