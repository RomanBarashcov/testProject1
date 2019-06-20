import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions/";

export class LoadDataContainer extends Component {

  componentWillMount() {
    
    if(!this.props.users.loading && !this.props.users.loaded) {
        this.props.actions.loadUsers();
    }

    if(!this.props.teams.loading && !this.props.teams.loaded) {
        this.props.actions.loadTeams();
    }

    if(!this.props.notifications.loading && !this.props.notifications.loaded) {
      this.props.actions.loadNotifications();
    }
  }

}

LoadDataContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired
};

function mapStateToProps(state) {
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