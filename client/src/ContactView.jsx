import React, { useState } from "react";
import {
  Box,
  Section,
  Image,
  Form,
  Hero,
  Heading,
  Media,
  Content,
  Button,
} from "react-bulma-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteContact } from "./appSlice";
import { useDispatch } from "react-redux";

const ContactView = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    hasBeenDeleted: false,
    isDeleting: false,
    error: false,
    hasError: false,
  });
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${props.data.name} from your contacts?`
      ) // I went with this because it was a quick way to force a confirmation from the user and didn't require any effort or design from a interface perspective. I *think* it could cause issues if server-side rendering was something in this app's future, and using the default browser look probably would inspire shade from other stakeholders using the app.
    ) {
      axios
        .delete(`http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts/${props.data.id}`)
        .then((result) => {
          dispatch(deleteContact(props.data.id));
          setState({
            ...state,
            isDeleting: false,
            hasBeenDeleted: true,
            hasError: false,
            error: null,
          });
        })
        .catch((err) => {
          console.info(JSON.stringify(err, null, 1));
          setState({
            ...state,
            isDeleting: false,
            hasBeenDeleted: false,
            hasError: true,
            error: err,
          });
          alert(
            `There was a technical issue deleting ${props.data.name} (${err.message}. They are still in your contacts. Please try again another time and contact support if the issue persists.)`
          );
        });
    } else {
      return undefined; // do nothing
    }
  };
  return (
    <>
      <Box style={{ minWidth: "fit-content" }}>
        <Section>
          {state.hasBeenDeleted ? (
            <Button onClick={() => handleDelete()} disabled={true}>
              Delete Contact
            </Button>
          ) : props.delete ? (
            <Button onClick={() => handleDelete()}>Delete Contact</Button>
          ) : (
            <Link to={`/edit/${props.data.id}`}>
              <Button>Update Contact</Button>
            </Link>
          )}

          <Hero>
            {state.hasBeenDeleted ? (
              <Heading
                style={{ textAlign: "center", textDecoration: "line-through" }}
              >
                {props.data.name}
              </Heading>
            ) : (
              <Heading style={{ textAlign: "center" }}>
                {props.data.name}
              </Heading>
            )}

            <Media>
              <Media.Item position="left">
                <Image
                  size={128}
                  alt="128x128"
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item>
              <Media.Item position="right" style={{ minWidth: "fit-content" }}>
                <Content style={{ overflowX: "auto" }}>
                  {Object.entries(props.data).map((thisPair) => {
                    const [key, value] = thisPair;
                    const exclusions = ["name", "id"];
                    if (exclusions.includes(key))
                      return (
                        <div
                          style={{ display: "none" }}
                          key={`hidden:${key}`}
                        ></div>
                      );
                    return (
                      <div key={`key:${key}:${value}`}>
                        <Form.Label>{key}</Form.Label>
                        <Form.Field disabled={true} value={value}>
                          {value}
                        </Form.Field>
                      </div>
                    );
                  })}
                </Content>
              </Media.Item>
            </Media>
          </Hero>
        </Section>
      </Box>
    </>
  );
};

export default ContactView;
