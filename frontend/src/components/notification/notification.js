import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions/actions";
import "./notification.css";

class Notification extends Component {

  render() {
    if(this.props.notifications.response){
        return (
            <div className="wrapper success">
                {this.props.notifications.response.msg}
            </div>
        );
    }else if(this.props.notifications.error){
        return (
            <div className="wrapper error">
                {this.props.notifications.error.msg}
            </div>
        );
    }else{
        return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
