import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions";
import LoginComponent from "../components/login_component";

export class LoginContainer extends Component {

    render() {
        return <LoginComponent data={this.props.data} actions={this.props.actions} />;
    }
}

LoginContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
