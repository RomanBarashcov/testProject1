import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions";
import UsersComponent from "../components/users_component";

export class UsersContainer extends Component {

    render() {
        return <UsersComponent data={this.props.data} actions={this.props.actions} />;
    }
}

UsersContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
        data: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
