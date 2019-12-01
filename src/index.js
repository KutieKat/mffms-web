import React from "react";
import { render } from "react-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";

const appRoot = document.getElementById("app");

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  appRoot
);
