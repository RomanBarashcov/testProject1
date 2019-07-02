import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions";
import HeaderComponent from "../components/header_component";

class HeaderContainer extends Component {

    render() {
        return <HeaderComponent data={this.props.data} actions={this.props.actions} />;
    }
}

HeaderContainer.propTypes = {
    actions: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      data: state.myProfile
    };
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
