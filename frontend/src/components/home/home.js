import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions/actions";
import { Redirect } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.action.getUserData();
  }

  logout() {
    this.props.action.logout();
  }

  render() {
    if (this.props.token === null) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }

    return (
      <div className="container">
        <div style={{textAlign: "center"}}>
          <h2>Welcome</h2>
          <h1>{(this.props.user.user)? this.props.user.user.name : null}</h1>
          <h5>{(this.props.user.user)? this.props.user.user.email : null}</h5>
          <button onClick={() => this.logout()} className="btn btn-info">Logout</button>
        </div>
      </div>
    );
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
)(Home);
