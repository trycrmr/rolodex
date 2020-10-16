import React from "react";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { mount } from "enzyme";

describe("The whole app", () => {
  it("renders without crashing", () => {
    mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
