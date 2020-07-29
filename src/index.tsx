import Theme from "@pluralsight/ps-design-system-theme";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import history from "./util/history";

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Theme name={Theme.names.dark}>
          <Router>
            <Navigation />
            <Main />
          </Router>
        </Theme>
      </ConnectedRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
