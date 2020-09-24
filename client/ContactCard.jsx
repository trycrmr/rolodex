import React from "react";
import { Card, Media, Heading, Content, Image } from "react-bulma-components";
import { Link } from "react-router-dom";

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
              <Heading size={6}>{props.data.name}</Heading>
              <Content>
                {props.data.email}
                <br />
                {props.data.phone}
              </Content>
            </Media.Item>
          </Media>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item renderAs="div" href="/view">
            <Link to={`/view/${props.data.id}`}>View</Link>
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="div" href="/edit">
            <Link to={`/edit/${props.data.id}`}>Edit</Link>
          </Card.Footer.Item>
          <Card.Footer.Item
            renderAs="a"
            onClick={() =>
              alert(
                `Are you sure you want to remove ${props.data.name} from your contacts?`
              )
            }
          >
            Delete
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ContactCard;
