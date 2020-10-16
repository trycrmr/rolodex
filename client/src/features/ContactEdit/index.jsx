import React from "react";
import {
  Box,
  Section,
  Image,
  Hero,
  Heading,
  Media,
} from "react-bulma-components";
import ContactForm from "../../features/ContactForm";

// Warning: Failed prop type: Invalid prop `type` of value `phone` supplied to `Input`, expected one of ["text","email","tel","password","number","search","color","date","time","datetime-local"].

const ContactEdit = (props) => {
  return (
    <>
      <Box style={{ minWidth: "fit-content" }}>
        <Section>
          <Hero>
            <Heading style={{ textAlign: "center" }}>
              {props.data?.name ? props.data.name : "New Contact!"}
            </Heading>
            <Media>
              <Media.Item position="left">
                <Image
                  size={128}
                  alt="128x128"
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item>
              <Media.Item position="right" style={{ minWidth: "fit-content" }}>
                <ContactForm data={props.data ? props.data : null} />
              </Media.Item>
            </Media>
          </Hero>
        </Section>
      </Box>
    </>
  );
};

export default ContactEdit;
