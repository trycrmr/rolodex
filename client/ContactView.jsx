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
      confirm(
        `Are you sure you want to delete ${props.data.name} from you contacts?`
      )
    ) {
      axios
        .delete(`/contacts/${props.data.id}`)
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
          {props.delete ? (
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
