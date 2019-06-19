"use strict";

module.exports = () => {

    const notificationService = require("./notification_service")();
    const userService = require("./user_service")();
    const teamService = require("./team_service")();

    return {
        notificationService: notificationService,
        userService: userService,
        teamService: teamService
    }
};