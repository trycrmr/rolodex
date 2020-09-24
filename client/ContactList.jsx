import React from "react";
import { Box, Columns } from "react-bulma-components";
import ContactCard from "./ContactCard.jsx";
const ContactList = (props) => {
  return (
    <>
      <Box>
        {props.data.map((thisContact, idx, origArr) => {
          if (idx % 2) {
            return null;
          } else {
            {
              /* need better keys than these keys */
            }
            return (
              <Columns breakpoint="tablet" key={Math.random()}>
                <Columns.Column key={idx}>
                  <ContactCard data={thisContact} key={thisContact.id} />
                </Columns.Column>
                {origArr[idx + 1] ? (
                  <Columns.Column key={idx + 1}>
                    <ContactCard
                      data={origArr[idx + 1]}
                      key={origArr[idx + 1].id}
                    />
                  </Columns.Column>
                ) : null}
              </Columns>
            );
          }
        })}
      </Box>
    </>
  );
};

export default ContactList;
