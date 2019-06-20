import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions";
import RegistrationComponent from "../components/registration_component";

export class RegistrationContainer extends Component {

    render() {
        return <RegistrationComponent data={this.props.data} actions={this.props.actions} />;
    }
}

RegistrationContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
        data: null
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
