import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions";
import RegistrationComponent from "../components/registration_component";

export class RegistrationContainer extends Component {
    
    componentDidMount() {
        if(!this.props.data.teams.loading && !this.props.data.teams.loaded) {
            this.props.actions.loadTeams();
        }
    }

    render() {
        return <RegistrationComponent data={this.props.data} actions={this.props.actions} />;
    }
}

RegistrationContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: { 
            teams: state.teams,
            authentification: state.authentification
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
