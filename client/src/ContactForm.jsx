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
  const initialState = {
    data: props.data ? { ...props.data } : { ...blankData },
    newData: props.data ? { ...props.data } : { ...blankData },
    hasSaved: false,
    isSaving: false,
    hasError: false,
    error: null,
    validations: {
      // I couldn't think of a form validation library off the top of my head so I wrote this. In production a battle-tested library should be used for this though so the edge cases of isEmail() or whatever form field are more likely to be accounted for.
      name: {
        tests: [
          // Validation tests are written to accommodate multiple validation functions per form field if need be (most likely)
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
            return email.indexOf("@") >= 0 ? true : false;
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
    // Used for dynamically determining what keys in the contact object should map to what type of input form fields.
    // Future possible mappings ["text","email","tel","password","number","search","color","date","time","datetime-local"]
    phone: "tel",
    name: "text",
    email: "email",
  };

  const resetForm = () => {
    setState(initialState);
  };

  const validateSubmission = (e) => {
    // Rolled this client side
    let thisSubmission = { ...state.newData };
    let verdict = Object.keys(thisSubmission)
      .map((thisKey) => {
        // For each form field...
        return state.validations[thisKey].tests
          .map((thisValidation) => {
            // ...run all the validation functions with the user input as the argument. ...
            const thisVerdict = thisValidation(thisSubmission[thisKey]);
            if (thisVerdict !== state.validations[thisKey].verdict) {
              // ...If the verdict has changed since the initial load or last attempted submission then update the state. This will show the proper message to the user for guidance. ...
              setState({
                ...state,
                validations: {
                  ...state.validations,
                  [thisKey]: {
                    ...state.validations[thisKey],
                    verdict: thisVerdict,
                  },
                },
              });
            }
            return thisVerdict;
          })
          .every((thisVerdictResult) => {
            // ... Check that all validation functions for a certain field return true. Then...
            return thisVerdictResult ? true : false;
          });
      })
      .every((thisVerdictResult) => {
        // ...check that all validation functions for ALL fields return true
        return thisVerdictResult ? true : false;
      });
    if (verdict) {
      // If all the validations for all the form fields pass then initiate the network call to save/update the contact.
      setState({
        ...state,
        isSaving: true,
        hasSaved: false,
        hasError: false,
        error: null,
      });
      if (!props.data) {
        // Cheap way of determining whether this contact form is adding a new user or updating an existing user. If no data is passed it means it's assing a new user.
        axios
          .post(
            `http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts`,
            state.newData
          ) // Before deploying this application to production more work should be done, either server-side or client-side, to sanitize this user input before it's persisted in a data store.
          .then((result) => {
            dispatch(updateContact(result.data));
            setState({
              // Completely replaces the state with the new contact info that is persisted server-side. This will also disable the "Save Contact" button because the data & newData objects are the same.
              ...state,
              data: result.data,
              newData: result.data,
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
        axios // Performing the network call in the component 1) because the data should persist server side before indicating to the user it has saved/updated, and 2) so the interface will adjust accordingly given the state of the network call represented in the component state without having to prop drill from the redux app state.
          .put(
            `http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts/${state.newData.id}`,
            state.newData
          ) // Before deploying this application to production more work should be done, either server-side or client-side, to sanitize this user input before it's persisted in a data store.
          .then((result) => {
            dispatch(updateContact(result.data));
            // Completely replaces the state with the new contact info that is persisted. This will also disable the "Save Contact" button because the data & newData objects are the same.
            setState({
              ...state,
              data: result.data,
              newData: result.data,
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
        return undefined; // This function just updates the state without returning anything. Idk if this is "best practice" or whatever but here we are.
      }
    } else {
      return undefined; // This function just updates the state without returning anything. Idk if this is "best practice" or whatever but here we are.
    }
  };

  return (
    <>
      <Content style={{ overflowX: "auto" }}>
        {Object.entries(state.newData).map((thisPair) => {
          // Iterates over the key/value pairs and creates a form field for each. This should allow for new contact key/value pairs to be rapidly added with minimal code changes. On the flipside, iterating over an object doesn't preserve the order the form fields render. Using a Map data structure could be an alternative way to preserve some kind of order. Regardless, cementing an order the form fields should render is something I'd do before deploying this app to production. Handling the form fields in this way also sets the stage for custom form fields to be added, if that were on the roadmap for this app.
          const [key, value] = thisPair;
          const exclusions = ["id"]; // Don't render a form field for the contact's id.

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
                    value={value}
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
          // If no fields have changed since the initial render or since the contact was saved/updated then don't allow the user to spam click the save/update button again.
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
