import React from "react";
import { mount } from "enzyme";
import ContactCard from "./index";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

const fakeContact = {
  name: "Milan Jenkins",
  email: "Kristian_Deckow@example.org",
  phone: "330-013-0169",
  id: "e12970f9-1deb-48a2-a4c2-854d86a82ef0",
};

describe("The Contact Card component", () => {
  it("renders without crashing", () => {
    mount(
      <MemoryRouter>
        <ContactCard data={fakeContact} />
      </MemoryRouter>
    );
  });

  it("should match snapshot", () => {
    // validates fields and links render as expected given the dataset
    expect(
      renderer
        .create(
          <MemoryRouter>
            <ContactCard data={fakeContact} />
          </MemoryRouter>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
