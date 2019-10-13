import React, {
  Component
} from "react";
import {
  bindActionCreators
} from "redux";
import {
  connect
} from "react-redux";
import * as Actions from "./actions/actions";
import {
  Redirect
} from "react-router-dom";
import Notification from "./components/notification/notification";

class App extends Component {

  componentWillMount() {
    this.props.action.getToken();
  }

  render() {
    if (!this.props.user.token)
      return (
        <div>
          <Notification />
          <Redirect to={{pathname: '/login'}} />
        </div>
      )
    else
      return <Redirect to = {
        {
          pathname: '/home'
        }
      }
    /> ;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
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
)(App);