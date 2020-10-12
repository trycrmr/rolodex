import React from "react";
import { Box, Columns, Heading } from "react-bulma-components";
import ContactCard from "../../ContactCard.jsx";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  // I was going for a "business card" look for this contacts with the bulma react components :-) .
  return (
    <>
      <Box style={{ margin: "auto" }}>
        {props.data.length === 0 ? (
          <Heading style={{ textAlign: "center" }}>
            You don't have any contacts; Why not <Link to="/add">add one</Link>?
          </Heading>
        ) : (
          props.data.map((thisContact, idx, origArr) => {
            if (idx % 2) {
              // Only process the even indexes so we can have two cards per column
              return null;
            } else {
              return (
                // I wasn't sure what keys to use here. Math.random is non-deterministic and using the index is frowned upon, but really the identifying component is the Contact card, so I used the contact.id as the key there. Probably could do this better, but idk what bugs with the current setup.
                <Columns
                  breakpoint="tablet"
                  key={Math.random()}
                  style={{ backgroundColor: "whitesmoke" }}
                >
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
          })
        )}
      </Box>
    </>
  );
};

export default ContactList;
