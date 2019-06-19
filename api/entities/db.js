"use strict"

const Sequelize = require("sequelize");

const sequelize = new Sequelize('test_db', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    define: {   
        timestamps: false
    }
});

var db = {};

db.Notification = require("./notification")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.State = require("./state")(sequelize, Sequelize);
db.TeamUserMap = require("./team_users_map")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.State = require("./state")(sequelize, Sequelize);
db.UserBlocked = require("./user_blocked")(sequelize, Sequelize);

db.sync = () => sequelize.sync();

module.exports = db;