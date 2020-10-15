import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";
import { Provider } from "react-redux";
import store from "../../store.js";
import { rest } from "msw";
import { setupServer } from "msw/node";

const fakeContacts = [
  {
    name: "Milan Jenkins",
    email: "Kristian_Deckow@example.org",
    phone: "330-013-0169",
    id: "e12970f9-1deb-48a2-a4c2-854d86a82ef0",
  },
];

const server = setupServer(
  rest.put("/contacts/:contactId", (req, res, ctx) => {
    // This would never be an actual route because any contactId passed in the url would filter the contacts and append the body to the contacts. For testing purposes it'll do because the test controls the input.
    fakeContacts = [
      ...fakeContacts.filter((thisContact) => {
        return thisContact.id !== contactId;
      }),
      req.body,
    ];
    return res(ctx.json(fakeContacts[fakeContacts.length - 1]));
  }),
  rest.post("/contacts", (req, res, ctx) => {
    // This would never be an actual route because any post would append the body to the contacts. For testing purposes it'll do because the test controls the input.
    fakeContacts = [...fakeContacts, req.body];
    return res(ctx.json(fakeContacts[fakeContacts.length - 1]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("The Contact Form component", () => {
  it("should indicate the network call failed", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={fakeContacts[0]} />
      </Provider>
    );
    server.use(
      rest.get("/contact", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    await userEvent.type(screen.getByLabelText("Name"), "Test name");
    waitForElementToBeRemoved(
      screen.getByText("Hidden field to prevent layout shift.")
    )
      .then(() => {
        return waitForElementToBeRemoved(screen.getByText("Updating..."));
      })
      .then(() => {
        return expect(screen.getByRole("alert")).toHaveTextContent(
          "There was an error: "
        );
      })
      .catch((err) => err);
    fireEvent.click(screen.getByText("Save Contact"));
  });

  it("should indicate a network call is happening", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={fakeContacts[0]} />
      </Provider>
    );
    server.use(
      rest.get("/contact", (req, res, ctx) => {
        setTimeout(() => {
          return res(ctx.status(200));
        }, 500);
      })
    );
    await userEvent.type(screen.getByLabelText("Name"), "Test name");
    waitForElementToBeRemoved(
      screen.getByText("Hidden field to prevent layout shift.")
    )
      .then(() => {
        return expect(
          screen.getByRole("note", { hidden: true })
        ).toHaveTextContent("Updating...");
      })
      .catch((err) => err);
    fireEvent.click(screen.getByText("Save Contact"));
  });

  it("should update the contact", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={fakeContacts[0]} />
      </Provider>
    );
    await userEvent.type(screen.getByLabelText("Name"), "Test name");
    waitForElementToBeRemoved(
      screen.getByText("Hidden field to prevent layout shift.")
    )
      .then(() => {
        return waitForElementToBeRemoved(screen.getByText("Updating..."));
      })
      .then(() => {
        return expect(screen.getByRole("status")).toHaveTextContent("Saved!");
      })
      .catch((err) => err);
    fireEvent.click(screen.getByText("Save Contact"));
  });

  it("should create a new contact", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
    await userEvent.type(screen.getByLabelText("Name"), "Test name");
    await userEvent.type(screen.getByLabelText("Phone"), "1234567891");
    await userEvent.type(screen.getByLabelText("Email"), "test@test.yeet");

    waitForElementToBeRemoved(
      screen.getByText("Hidden field to prevent layout shift.")
    )
      .then(() => {
        return waitForElementToBeRemoved(screen.getByText("Updating..."));
      })
      .then(() => {
        return expect(screen.getByRole("status")).toHaveTextContent("Saved!");
      })
      .catch((err) => err);
    fireEvent.click(screen.getByText("Save Contact"));
  });

  it("should reset form when reset button is clicked (with data)", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={fakeContacts[0]} />
      </Provider>
    );
    userEvent.type(screen.getByLabelText("Name"), "Test name");
    fireEvent.click(screen.getByText("Reset Form"));

    expect(screen.getByRole("form")).toHaveFormValues({
      name: "Milan Jenkins",
      email: "Kristian_Deckow@example.org",
      phone: "330-013-0169",
    });
  });
  it("should reset form when reset button is clicked (without data)", async () => {
    render(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
    userEvent.type(screen.getByLabelText("Name"), "Test name");
    fireEvent.click(screen.getByText("Reset Form"));

    expect(screen.getByRole("form")).toHaveFormValues({
      name: "",
      phone: "",
      email: "",
    });
  });

  it("renders with no data", () => {
    render(
      <Provider store={store}>
        <ContactForm data={null} />
      </Provider>
    );
  });

  it("renders with data", () => {
    render(
      <Provider store={store}>
        <ContactForm data={fakeContacts[0]} />
      </Provider>
    );
  });

  it("has name input", () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );
    expect(screen.queryByLabelText("Name")).toBeInTheDocument();
  });

  it("has phone input", () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );
    expect(screen.queryByLabelText("Phone")).toBeInTheDocument();
  });

  it("has email input", () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );
    expect(screen.queryByLabelText("Email")).toBeInTheDocument();
  });
});
