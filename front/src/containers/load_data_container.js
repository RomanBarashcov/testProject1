import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions/";

export class LoadDataContainer extends Component {

  componentDidMount() {
    
    if(!this.props.users.loading && !this.props.users.loaded) {
        this.props.actions.loadUsers();
    }

    if(!this.props.teams.loading && !this.props.teams.loaded) {
        this.props.actions.loadTeams();
    }

    if(!this.props.notifications.loading && !this.props.notifications.loaded) {
      //this.props.actions.loadNotifications();
    }
  }

  render() {
    return <div><main>{this.props.children}</main></div>;
  }

}

LoadDataContainer.propTypes = {
    users: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log("STATE: ", state);
    return {
      users: state.users,
      teams: state.teams,
      notifications: state.notifications
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoadDataContainer);