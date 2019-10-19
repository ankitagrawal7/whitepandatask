import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./login.css";
import * as Actions from "../../actions/actions";
import { AUTH_TYPE } from "./../../constants";

class Login extends Component {  

  constructor(props) {
    super(props);

    this.emailRe = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    this.passRe = new RegExp("[0-9].+");

    this.state = {
      username: null,
      name: null,
      email: null,
      mobileNumber: null,
      password: null,
      otp: null,
      rememberMe: false,
      oAuthToken: null
    };
  }

  onFormSubmit(ev) {
    ev.preventDefault();
    this.setState({
      email: (this.emailRe.test(this.state.username))? this.state.username : this.state.email,
      mobileNumber: (this.passRe.test(this.state.username))? this.state.username : this.state.mobileNumber
    }, () => {
      if ((this.state.email || this.state.mobileNumber) && !(this.state.password || this.state.otp)) {     
        this.props.action.verify(this.state);
      }else{
        
        if(this.state.email && this.state.password && this.state.mobileNumber && this.state.name){
          this.register(this.state);
        }else if ((this.state.email && this.state.password) || (this.state.mobileNumber && this.state.otp)) {
          this.login(this.state, AUTH_TYPE.NORMAL);
        }else{
          this.props.action.alertError({
            msg: "Please enter valid input!"
          });
          setTimeout(() => this.props.action.reset(), 2500);
        }
      }
    });
  }

  register(data){
    this.props.action.register(data);
  }

  /**
   * 
   * @param {Object} data Login form data
   * @param {String} authType type of authentication [OAuth, Normal]
   */
  login(data, authType){
    this.props.action.login({...data, authType});
  }

  render() {
    let passOrPin = null;
    if(this.state.username !== null && this.props.user.isRegistered !== null){
      if(this.props.user.isRegistered){
        passOrPin = (this.emailRe.test(this.state.username))? <>
                                                                <input type="password" className="input" placeholder="Enter your password" required
                                                                  onChange={ev => this.setState({ password: ev.target.value })} />
                                                                <div className="rememberme">
                                                                  <input type="checkbox" id="rememberme" name="rememberme" onChange={ev => this.setState({ rememberMe: ev.target.checked })} /> 
                                                                  <label htmlFor="rememberme">Remember Me</label>
                                                                </div>
                                                              </>
                                                              : 
                                                              <>
                                                                <input type="number" className="input" min="000000" max="999999" placeholder="Enter OTP" required
                                                                onChange={ev => this.setState({ otp: ev.target.value })} />
                                                                <div className="rememberme">
                                                                  <input type="checkbox" id="rememberme" name="rememberme" onChange={ev => this.setState({ rememberMe: ev.target.checked })} /> 
                                                                  <label htmlFor="rememberme">Remember Me</label>
                                                                </div>
                                                              </>
      } else {
        passOrPin = (<div>
                        {(this.emailRe.test(this.state.username))? <input type="text" className="input" placeholder="Enter mobile number" required
                                                                    onChange={ev => this.setState({ mobileNumber: ev.target.value })} /> : 
                                                                   <input type="email" className="input" placeholder="Enter email" required
                                                                    onChange={ev => this.setState({ email: ev.target.value })} />}
                        <input type="password" className="input" placeholder="Enter your password" required
                          onChange={ev => this.setState({ password: ev.target.value })} /> 
                        <input type="name" className="input" placeholder="Enter your name" required
                          onChange={ev => this.setState({ name: ev.target.value })} />
                    </div>);
      }
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row full">
              <div className="col-sm-12 col-md-8 col-lg-6 box">                
                <h2>{(this.props.user.isRegistered === null || this.props.user.isRegistered !== false)? "Login" : "Register"}</h2>
                <div className="card">
                  <div className="card-body">                        
                    <form onSubmit={ev => this.onFormSubmit(ev)}>
                      <input
                          type="text"
                          className="input"
                          placeholder="Enter email or mobile number"
                          required
                          onChange={ev =>
                            this.setState({ username: ev.target.value })
                          }
                        />

                      {passOrPin}
                        
                      <div className="btn-holder">
                        <button type="submit">
                          >
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>              
            </div>
          </div>
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
)(Login);
