import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Actions from "../actions";
import UserDetailsComponent from "../components/user_details_component";

export class UserDetailsContainer extends Component {

    render() {
        return <UserDetailsComponent data={this.props.data} actions={this.props.actions} />;
    }
}

UserDetailsContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.user_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsContainer);
