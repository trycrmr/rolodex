import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import ContactForm from "../ContactForm";
import { Provider } from "react-redux";
import store from "../../store.js";

const fakeContact = {
  name: "Milan Jenkins",
  email: "Kristian_Deckow@example.org",
  phone: "330-013-0169",
  id: "e12970f9-1deb-48a2-a4c2-854d86a82ef0",
};

describe("The Contact Form component", () => {
  it("renders with no data", () => {
    mount(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
  });

  it("renders with data", () => {
    mount(
      <Provider store={store}>
        <ContactForm data={fakeContact} />
      </Provider>
    );
  });

  it("has name input", () => {
    const emptyForm = mount(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
    expect(emptyForm.exists('[name="name"]')).toBe(true);
  });

  it("has phone input", () => {
    const emptyForm = mount(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
    expect(emptyForm.exists('[name="phone"]')).toBe(true);
  });

  it("has email input", () => {
    const emptyForm = mount(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
    expect(emptyForm.exists('[name="email"]')).toBe(true);
  });
});
