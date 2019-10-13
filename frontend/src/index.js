import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

import { Provider } from "react-redux";
import Store from "./Store";

import { Route, HashRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/home/home";
import Login from "./components/login/login";
const StoreInstance = Store();

const routing = (
  <Provider store={StoreInstance}>
    <HashRouter>
      <div>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        {/* <Route path="/quiz/:quiz_id" component={Quiz} /> */}
      </div>
    </HashRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
