import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions";
import NotificationsComponent from "../components/notifications_component";

export class NotificationsContainer extends Component {

    render() {
        return <NotificationsComponent data={this.props.data} actions={this.props.actions} />;
    }
}

NotificationsContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
        data: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
