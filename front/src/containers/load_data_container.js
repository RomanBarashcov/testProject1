import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions/";

class LoadDataContainer extends Component {

  componentDidMount() {

    if(!this.props.myProfile.loading && !this.props.myProfile.loaded) {
      this.props.actions.loadCurrentUser();
    }

    if(!this.props.users.loading && !this.props.users.loaded) {
        this.props.actions.loadUsers();
    }

    if(!this.props.teams.loading && !this.props.teams.loaded) {
        this.props.actions.loadTeams();
    }

    if(!this.props.notifications.loading && !this.props.notifications.loaded) {
      this.props.actions.loadNotifications();
    }

    if(!this.props.notificationTypes.loading && !this.props.notificationTypes.loaded) {
      this.props.actions.loadNotificationTypes();
    }
  }

  render() {
    return <div><main>{this.props.children}</main></div>;
  }

}

LoadDataContainer.propTypes = {
    myProfile: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    notificationTypes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log("STATE: ", state);
    return {
      myProfile: state.myProfile,
      users: state.users,
      teams: state.teams,
      notifications: state.notifications,
      notificationTypes: state.notificationTypes
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoadDataContainer);