import React, { useState } from "react";
import { Form, Content, Button } from "react-bulma-components";
import { useDispatch } from "react-redux";
import { updateContact } from "./appSlice";
import axios from "axios";

const ContactForm = (props) => {
  const dispatch = useDispatch();
  const blankData = {
    name: "",
    phone: "",
    id: "",
    email: "",
  };
  // if (!props.data) props.data = { ...blankData };
  const initialState = {
    data: props.data ? { ...props.data } : { ...blankData },
    newData: props.data ? { ...props.data } : { ...blankData },
    hasSaved: false,
    isSaving: false,
    hasError: false,
    error: null,
    validations: {
      // I couldn't think of a form validation library off the top of my head so I wrote this. A battle-tested library should be used for this though so the edge cases of isEmail() or whatever form field are accounted for.
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
    // Future possible mappings ["text","email","tel","password","number","search","color","date","time","datetime-local"]
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

    if (verdict) {
      setState({
        ...state,
        isSaving: true,
        hasSaved: false,
        hasError: false,
        error: null,
      });
      if (!props.data) {
        axios
          .post(`/contacts`, state.newData)
          .then((result) => {
            dispatch(updateContact(result.data));
            setState({
              ...state,
              isSaving: false,
              hasSaved: true,
              hasError: false,
              error: null,
            });
          })
          .catch((err) => {
            setState({
              ...state,
              isSaving: false,
              hasSaved: false,
              hasError: true,
              error: err,
            });
          });
      } else {
        axios
          .put(`/contacts/${state.newData.id}`, state.newData)
          .then((result) => {
            dispatch(updateContact(result.data));
            setState({
              ...state,
              isSaving: false,
              hasSaved: true,
              hasError: false,
              error: null,
            });
          })
          .catch((err) => {
            setState({
              ...state,
              isSaving: false,
              hasSaved: false,
              hasError: true,
              error: err,
            });
          });
        return undefined;
      }
    } else {
      return undefined;
    }
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
      {state.isSaving ? (
        <Form.Help color="warning">Updating...</Form.Help>
      ) : state.hasError ? (
        <Form.Help color="danger">
          There was an error: {state.error.message}
        </Form.Help>
      ) : state.hasSaved ? (
        <Form.Help color="success">Saved!</Form.Help>
      ) : (
        <Form.Help style={{ visibility: "hidden" }}>
          Hidden field to prevent layout shift.
        </Form.Help>
      )}
    </>
  );
};

export default ContactForm;
