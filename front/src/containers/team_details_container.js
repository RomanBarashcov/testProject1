import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions";
import TeamDetailsComponent from "../components/team_details_component";

export class TeamsDetailsContainer extends Component {

    render() {
        return <TeamDetailsComponent data={this.props.data} actions={this.props.actions} />;
    }
}

TeamsDetailsContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
        data: state.teamInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsDetailsContainer);
