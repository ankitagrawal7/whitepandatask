(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t){e.exports={REGISTER:"REGISTER",NEW_USER:"NEW_USER",EXISTING_USER:"EXISTING_USER",GET_USER_DATA:"GET_USER_DATA",SET_USER_DATA:"SET_USER_DATA",SUCCESS:"SUCCESS",ERROR:"ERROR",RESET:"RESET",LOGOUT:"LOGOUT",GET_TOKEN:"GET_TOKEN",AUTH_TYPE:{NORMAL:"NORMAL",OAUTH:"OAUTH"}}},39:function(e,t,n){e.exports=n(71)},44:function(e,t,n){},68:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"verify",function(){return N}),n.d(r,"login",function(){return j}),n.d(r,"register",function(){return w}),n.d(r,"getUserData",function(){return _}),n.d(r,"logout",function(){return U}),n.d(r,"alertSuccess",function(){return A}),n.d(r,"alertError",function(){return k}),n.d(r,"reset",function(){return C}),n.d(r,"getToken",function(){return G});var a=n(0),o=n.n(a),s=n(35),u=n.n(s);n(44),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(45);var i=n(11),c=n(3),l=n(10),m=n(1),p={user:null,isRegistered:null,token:null},E={response:null,error:null},h=Object(c.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m.REGISTER:return{user:t.user};case m.GET_USER_DATA:return console.log(t),Object(l.a)({},e,{user:t.user});case m.GET_TOKEN:var n=sessionStorage.getItem("user"),r=null===n?null:JSON.parse(n).token;return Object(l.a)({},e,{token:r});case m.SET_USER_DATA:return console.log(m.SET_USER_DATA,t.user),Object(l.a)({},e,{token:t.user.token});case m.LOGOUT:return{user:null,isRegistered:null,token:null};case m.NEW_USER:return console.log(m.NEW_USER,t),Object(l.a)({},e,{isRegistered:t.error.isRegistered});case m.EXISTING_USER:return console.log(m.EXISTING_USER,t),Object(l.a)({},e,{isRegistered:t.data.isRegistered});default:return e}},notifications:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m.SUCCESS:return console.log(t),Object(l.a)({},e,{response:t.response});case m.ERROR:return Object(l.a)({},e,{error:t.error});case m.RESET:return{response:null,error:null};default:return e}}}),d=n(37),f=n(22),b=n(17),g=n(12),R=n(13),S=n(15),O=n(14),v=n(16),T=n(19),y=n.n(T),N=function(e){return function(t){return y.a.post("".concat("","/auth/verify"),e).then(function(e){console.log(e.data),t({type:m.EXISTING_USER,data:e.data})}).catch(function(e){console.error(e.response),406===e.response.status&&(t({type:m.NEW_USER,error:e.response.data}),t(k(e.response.data)),setTimeout(function(){return t(C())},2500))})}},j=function(e){return function(t){return y.a.post("".concat("","/auth/login"),e,{withCredentials:!0}).then(function(e){t({type:m.SET_USER_DATA,user:e.data})}).catch(function(e){console.log(e),t(k(e.response.data)),setTimeout(function(){return t(C())},2500)})}},w=function(e){return function(t){return y.a.post("".concat("","/auth/register"),e).then(function(e){console.log(e.data),t(A(e.data)),t({type:m.SET_USER_DATA,user:e.data}),setTimeout(function(){return t(C())},2500)}).catch(function(e){console.log(e),t(k(e.response.data)),setTimeout(function(){return t(C())},2500)})}},_=function(){return function(e){return y.a.get("".concat("","/user/details"),{withCredentials:!0}).then(function(t){e({type:m.GET_USER_DATA,user:t.data})}).catch(function(t){console.log(t),e({type:m.LOGOUT})})}},U=function(){return function(e){return y.a.get("".concat("","/auth/logout"),{withCredentials:!0}).then(function(t){e({type:m.LOGOUT})})}},A=function(e){return{type:m.SUCCESS,response:e}},k=function(e){return{type:m.ERROR,error:e}},C=function(){return{type:m.RESET}},G=function(){return{type:m.GET_TOKEN}},I=(n(68),function(e){function t(){return Object(g.a)(this,t),Object(S.a)(this,Object(O.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(R.a)(t,[{key:"render",value:function(){return this.props.notifications.response?o.a.createElement("div",{className:"wrapper success"},this.props.notifications.response.msg):this.props.notifications.error?o.a.createElement("div",{className:"wrapper error"},this.props.notifications.error.msg):null}}]),t}(a.Component));var D=Object(i.b)(function(e){return{notifications:e.notifications}},function(e){return{action:Object(c.b)(r,e)}})(I),x=function(e){function t(){return Object(g.a)(this,t),Object(S.a)(this,Object(O.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(R.a)(t,[{key:"componentWillMount",value:function(){this.props.action.getToken()}},{key:"render",value:function(){return this.props.user.token?o.a.createElement(b.a,{to:{pathname:"/home"}}):o.a.createElement("div",null,o.a.createElement(D,null),o.a.createElement(b.a,{to:{pathname:"/login"}}))}}]),t}(a.Component);var L=Object(i.b)(function(e){return{user:e.user}},function(e){return{action:Object(c.b)(r,e)}})(x),M=function(e){function t(e){var n;return Object(g.a)(this,t),(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).props.action.getUserData(),n}return Object(v.a)(t,e),Object(R.a)(t,[{key:"logout",value:function(){this.props.action.logout(),this.props.history.push("login")}},{key:"render",value:function(){var e=this;return this.props.user?o.a.createElement("div",{className:"container"},o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("h2",null,"Welcome"),o.a.createElement("h1",null,this.props.user.user?this.props.user.user.name:null),o.a.createElement("h5",null,this.props.user.user?this.props.user.user.email:null),o.a.createElement("button",{onClick:function(){return e.logout()},className:"btn btn-info"},"Logout"))):o.a.createElement(b.a,{to:{pathname:"/login"}})}}]),t}(a.Component);var W=Object(i.b)(function(e){return{user:e.user}},function(e){return{action:Object(c.b)(r,e)}})(M),q=(n(70),function(e){function t(e){var n;return Object(g.a)(this,t),(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).emailRe=new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),n.passRe=new RegExp("[0-9].+"),n.state={username:null,name:null,email:null,mobileNumber:null,password:null,otp:null,rememberMe:!1,oAuthToken:null},n}return Object(v.a)(t,e),Object(R.a)(t,[{key:"onFormSubmit",value:function(e){var t=this;e.preventDefault(),this.setState({email:this.emailRe.test(this.state.username)?this.state.username:this.state.email,mobileNumber:this.passRe.test(this.state.username)?this.state.username:this.state.mobileNumber},function(){!t.state.email&&!t.state.mobileNumber||t.state.password||t.state.otp?t.state.email&&t.state.password&&t.state.mobileNumber&&t.state.name?t.register(t.state):t.state.email&&t.state.password||t.state.mobileNumber&&t.state.otp?t.login(t.state,m.AUTH_TYPE.NORMAL):(t.props.action.alertError({msg:"Please enter valid input!"}),setTimeout(function(){return t.props.action.reset()},2500)):t.props.action.verify(t.state)})}},{key:"register",value:function(e){this.props.action.register(e)}},{key:"login",value:function(e,t){this.props.action.login(Object(l.a)({},e,{authType:t}))}},{key:"render",value:function(){var e=this,t=null;return null!==this.state.username&&null!==this.props.user.isRegistered&&(t=this.props.user.isRegistered?this.emailRe.test(this.state.username)?o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{type:"password",className:"input",placeholder:"Enter your password",required:!0,onChange:function(t){return e.setState({password:t.target.value})}}),o.a.createElement("div",{className:"rememberme"},o.a.createElement("input",{type:"checkbox",id:"rememberme",name:"rememberme",onChange:function(t){return e.setState({rememberMe:t.target.checked})}}),o.a.createElement("label",{htmlFor:"rememberme"},"Remember Me"))):o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{type:"number",className:"input",min:"000000",max:"999999",placeholder:"Enter OTP",required:!0,onChange:function(t){return e.setState({otp:t.target.value})}}),o.a.createElement("div",{className:"rememberme"},o.a.createElement("input",{type:"checkbox",id:"rememberme",name:"rememberme",onChange:function(t){return e.setState({rememberMe:t.target.checked})}}),o.a.createElement("label",{htmlFor:"rememberme"},"Remember Me"))):o.a.createElement("div",null,this.emailRe.test(this.state.username)?o.a.createElement("input",{type:"text",className:"input",placeholder:"Enter mobile number",required:!0,onChange:function(t){return e.setState({mobileNumber:t.target.value})}}):o.a.createElement("input",{type:"email",className:"input",placeholder:"Enter email",required:!0,onChange:function(t){return e.setState({email:t.target.value})}}),o.a.createElement("input",{type:"password",className:"input",placeholder:"Enter your password",required:!0,onChange:function(t){return e.setState({password:t.target.value})}}),o.a.createElement("input",{type:"name",className:"input",placeholder:"Enter your name",required:!0,onChange:function(t){return e.setState({name:t.target.value})}}))),o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("div",{className:"row full"},o.a.createElement("div",{className:"col-sm-12 col-md-8 col-lg-6 box"},o.a.createElement("h2",null,null===this.props.user.isRegistered||!1!==this.props.user.isRegistered?"Login":"Register"),o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("form",{onSubmit:function(t){return e.onFormSubmit(t)}},o.a.createElement("input",{type:"text",className:"input",placeholder:"Enter email or mobile number",required:!0,onChange:function(t){return e.setState({username:t.target.value})}}),t,o.a.createElement("div",{className:"btn-holder"},o.a.createElement("button",{type:"submit"},">"))))))))))}}]),t}(a.Component));var F=Object(i.b)(function(e){return{user:e.user}},function(e){return{action:Object(c.b)(r,e)}})(q),X=Object(c.d)(h,Object(c.a)(d.a)),H=o.a.createElement(i.a,{store:X},o.a.createElement(f.a,null,o.a.createElement("div",null,o.a.createElement(b.b,{path:"/",component:L}),o.a.createElement(b.b,{path:"/login",component:F}),o.a.createElement(b.b,{path:"/home",component:W}))));u.a.render(H,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[39,1,2]]]);
//# sourceMappingURL=main.fa4513ba.chunk.js.map