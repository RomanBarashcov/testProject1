import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions";
import TeamsComponent from "../components/teams_component";

export class TeamsContainer extends Component {

    render() {
        return <TeamsComponent data={this.props.data} actions={this.props.actions} />;
    }
}

TeamsContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
        data: state.teams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsContainer);
