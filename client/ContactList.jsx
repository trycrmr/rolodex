import React from "react";
import { Box, Columns } from "react-bulma-components";
import ContactCard from "./ContactCard.jsx";
const ContactList = (props) => {
  return (
    <>
      <Box>
        <Columns breakpoint="tablet">
          <Columns.Column>
            <ContactCard />
          </Columns.Column>
          <Columns.Column>
            <ContactCard />
          </Columns.Column>
        </Columns>
        <Columns breakpoint="tablet">
          <Columns.Column>
            <ContactCard />
          </Columns.Column>
          <Columns.Column>
            <ContactCard />
          </Columns.Column>
        </Columns>
      </Box>
    </>
  );
};

export default ContactList;
