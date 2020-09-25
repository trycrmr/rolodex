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
  const initialState = {
    data: { ...props.data },
    newData: { ...props.data },
    validations: {
      name: {
        tests: [
          (name) => {
            return name.trim().length > 0 ? true : false;
          },
        ],
        helpMessage: "Must have at least one character.",
        errorMessage: "Please enter at least one character for the name.",
        verdict: true,
      },
      phone: {
        tests: [
          (phone) => {
            return phone.replaceAll("-", "").trim().length >= 7 ? true : false;
          },
        ],
        helpMessage:
          "Must have at least seven characters, not including the dashes.",
        errorMessage:
          "Please enter at least seven characters for the phone number.",
        verdict: true,
      },
      email: {
        tests: [
          (email) => {
            return email.indexOf("@") > 0 ? true : false;
          },
        ],
        helpMessage: 'Must have an "@" symbol.',
        errorMessage: 'Please enter an email with an "@" symbol.',
        verdict: true,
      },
      id: {
        // Not editable by the user so defaults to pass
        tests: [],
        verdict: true,
      },
    },
  };
  const [state, setState] = useState(initialState);
  const inputTypeMapping = {
    phone: "tel",
    name: "text",
    email: "email",
  };

  const resetForm = () => {
    setState(initialState);
  };

  const validateSubmission = (e) => {
    let thisSubmission = { ...state.newData };
    let verdict = Object.keys(thisSubmission)
      .map((thisKey) => {
        return state.validations[thisKey].tests.map((thisValidation) => {
          const thisVerdict = thisValidation(thisSubmission[thisKey]);
          if (thisVerdict !== state.validations[thisKey].verdict) {
            const newValidations = {
              ...state.validations[thisKey],
              verdict: thisVerdict,
            };
            setState({
              ...state,
              validations: { ...state.validations, [thisKey]: newValidations },
            });
          }
          return thisVerdict;
        });
      })
      .every((thisValidation) => {
        return thisValidation ? true : false;
      });
  };

  return (
    <>
      <Content style={{ overflowX: "auto" }}>
        {Object.entries(state.newData).map((thisPair) => {
          const [key, value] = thisPair;
          const exclusions = ["id"];

          if (exclusions.includes(key))
            return (
              <div style={{ display: "none" }} key={`hidden:${key}`}></div>
            );
          return (
            <div key={`key:${key}`}>
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

              {state.validations[key].verdict ? (
                <Form.Help color="info">
                  {state.validations[key].helpMessage}
                </Form.Help>
              ) : (
                <Form.Help color="danger">
                  {state.validations[key].errorMessage}
                </Form.Help>
              )}
            </div>
          );
        })}
      </Content>
      <Button
        disabled={Object.keys(state.data).every(
          (thisKey) => state.data[thisKey] === state.newData[thisKey]
        )}
        onClick={(e) => {
          validateSubmission(e);
        }}
      >
        Save Contact
      </Button>
      <Button
        onClick={() => {
          resetForm();
        }}
      >
        Reset Form
      </Button>
    </>
  );
};

export default ContactForm;
