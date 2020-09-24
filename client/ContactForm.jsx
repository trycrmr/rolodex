import React, { useState } from "react";
import { Form, Content, Button } from "react-bulma-components";

// Warning: Failed prop type: Invalid prop `type` of value `phone` supplied to `Input`, expected one of ["text","email","tel","password","number","search","color","date","time","datetime-local"].

const ContactForm = (props) => {
  const blankData = {
    name: "",
    phone: "",
    id: "",
    email: "",
  };
  if (!props.data) props.data = { ...blankData };
  const [state, setState] = useState({
    data: { ...props.data },
    newData: { ...props.data },
  });
  const inputTypeMapping = {
    phone: "tel",
    name: "text",
    email: "email",
  };
  return (
    <>
      <Content style={{ overflowX: "auto" }}>
        {Object.entries(props.data).map((thisPair) => {
          const [key, value] = thisPair;
          const exclusions = ["name", "id"];

          if (exclusions.includes(key))
            return (
              <div style={{ display: "none" }} key={`hidden:${key}`}></div>
            );
          return (
            <div key={`key:${key}:${value}`}>
              <Form.Control>
                <Form.Field>
                  <Form.Label>{key}</Form.Label>
                  <Form.Input
                    type={inputTypeMapping[key]}
                    placeholder={key}
                    value={state.newData[key]}
                    onChange={(e) => {
                      let newData = { ...state.newData };
                      newData[key] = e.target.value;
                      setState({ ...state, newData });
                    }}
                  />
                </Form.Field>
              </Form.Control>
            </div>
          );
        })}
      </Content>
      <Button>Save Contact</Button>
    </>
  );
};

export default ContactForm;
