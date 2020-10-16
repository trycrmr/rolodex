import React from "react";
import renderer from "react-test-renderer";
import ContactList from "../ContactList";
import { MemoryRouter } from "react-router-dom";

const mockData = [
  {
    name: "Milan Jenkins",
    email: "Kristian_Deckow@example.org",
    phone: "330-013-0169",
    id: "e12970f9-1deb-48a2-a4c2-854d86a82ef0",
  },
  {
    name: "Dr. Fletcher Doyle",
    email: "Bernadine_Mitchell@example.net",
    phone: "213-585-2178",
    id: "1e580e71-c00e-4dad-9692-bbe1b6e93e37",
  },
];

describe("The Contact List component", () => {
  test("renders properly with no contacts", () => {
    expect(
      renderer
        .create(
          <MemoryRouter>
            <ContactList data={[]} />
          </MemoryRouter>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test("renders properly with one contact", () => {
    expect(
      renderer
        .create(
          <MemoryRouter>
            <ContactList data={[mockData[0]]} />
          </MemoryRouter>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test("renders properly with two contacts", () => {
    expect(
      renderer
        .create(
          <MemoryRouter>
            <ContactList data={mockData} />
          </MemoryRouter>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
