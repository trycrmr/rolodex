import React from "react";
import { Card, Media, Heading, Content, Image } from "react-bulma-components";

const ContactCard = (props) => {
  return (
    <>
      <Card>
        <Card.Header></Card.Header>
        <Card.Content>
          <Media position="right">
            <Media.Item renderAs="figure" position="left">
              <Image
                size={128}
                alt="128x128"
                src="http://bulma.io/images/placeholders/128x128.png"
              />
            </Media.Item>
            <Media.Item style={{ margin: "auto", textAlign: "center" }}>
              <Heading size={6}>FirstName LastName</Heading>
            </Media.Item>
          </Media>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item renderAs="a" href="#View">
            View
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="a" href="#Edit">
            Edit
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="a" href="#Delete">
            Delete
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ContactCard;
