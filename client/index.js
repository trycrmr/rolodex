import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import store from "./store";
import { Provider } from "react-redux";
import "./styles/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
