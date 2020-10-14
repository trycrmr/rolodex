import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Content, Button } from "react-bulma-components";
import "yup-phone";
import { useDispatch } from "react-redux";
import { updateContact } from "../../slices/appSlice";
import axios from "axios";

const FormHelpMarginBottom = { marginBottom: "12px" };

const schema = Yup.object().shape({
  name: Yup.string().required("Name cannot be blank."),
  email: Yup.string()
    .required("Email is required.")
    .email("This email is invalid."),
  phone: Yup.string() // Known issue if phone is an empty string the validation still runs https://github.com/abhisekp/yup-phone/issues/313 . Hence the .when and isPhoneBlank workaround.
    .required("Phone is required.")
    .when("isPhoneBlank", {
      is: false,
      then: Yup.string().phone(
        undefined,
        undefined,
        "This phone number is invalid."
      ),
      otherwise: Yup.string(),
    }),
});

const ContactFormFormik = (props) => {
  const dispatch = useDispatch();
  const blankData = {
    name: "",
    phone: "",
    id: "",
    email: "",
  };
  return (
    <>
      <Content style={{ overflowX: "auto" }}>
        <Formik
          initialValues={{
            ...props.data,
            originalData: props.data,
            isPhoneBlank: true,
            order: ["name", "email", "phone"], // Maps to keys in data passed to the component
            data: props.data ? { ...props.data } : { ...blankData },

            inputTypeMapping: {
              // Used for dynamically determining what keys in the contact object should map to what type of input form fields.
              // Future possible mappings ["text","email","tel","password","number","search","color","date","time","datetime-local"]
              phone: "tel",
              name: "text",
              email: "email",
            },
            infoHelpMapping: {
              phone: "Must include country code and area code.",
              name: "Must have at least one character.",
              email: "Must pass email validations.",
            },
          }}
          initialStatus={{
            hasSaved: false,
            lastSave: null,
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            let valuesToSubmit = {
              id: values.data.id,
              name: values.name,
              phone: values.phone,
              email: values.email,
            };
            if (!props.data) {
              // Rough check to determine whether we're adding a new user or editing one. Those two backend endpoints are different.
              await axios
                .post(
                  `http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts`,
                  valuesToSubmit
                )
                .then((result) => {
                  dispatch(updateContact(result.data));
                })
                .catch((err) => {
                  actions.setFieldError("general", err.message);
                }); // Before deploying this application to production more work should be done, either server-side or client-side, to sanitize this user input before it's persisted in a data store.; // Before deploying this application to production more work should be done, either server-side or client-side, to sanitize this user input before it's persisted in a data store.
              actions.setStatus({
                ...values.status,
                hasSaved: true,
                lastSave: new Date(),
              });
            } else {
              // Performing the network call in the component 1) because the data should persist server side before indicating to the user it has saved/updated, and 2) so the interface will adjust accordingly given the state of the network call represented in the component state without having to prop drill from the redux app state.
              let hasNothingChanged = Object.entries(valuesToSubmit).every(
                (thisPair) => {
                  let [key, value] = thisPair;
                  return value === props.data[key];
                }
              );
              if (hasNothingChanged) {
                // Do not bother saving because there haven't been any changes
              } else {
                await axios
                  .put(
                    `http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts/${values.data.id}`,
                    valuesToSubmit
                  )
                  .then((result) => {
                    dispatch(updateContact(result.data));
                  })
                  .catch((err) => {
                    actions.setFieldError("general", err.message);
                  }); // Before deploying this application to production more work should be done, either server-side or client-side, to sanitize this user input before it's persisted in a data store.
                actions.setStatus({
                  ...values.status,
                  hasSaved: true,
                  lastSave: new Date(),
                });
              }
            }
            actions.setSubmitting(false);
          }}
          validationSchema={schema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            status,
            setValues,
            handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              {values.order.map((key) => {
                return (
                  <div key={`key:${key}`}>
                    <Form.Control>
                      <Form.Field>
                        <Form.Label htmlFor={key}>
                          {key[0].toUpperCase() + key.substring(1)}
                        </Form.Label>
                        <Form.Input
                          type={values.inputTypeMapping[key]}
                          placeholder={key}
                          onChange={(e) => {
                            if (values.phone && values.phone.length > 0) {
                              setValues(
                                { ...values, isPhoneBlank: false },
                                false
                              );
                            } else {
                              setValues(
                                { ...values, isPhoneBlank: true },
                                false
                              );
                            }
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values[key]}
                          name={key}
                        />
                      </Form.Field>
                    </Form.Control>
                    {!touched[key] ? (
                      <Form.Help style={FormHelpMarginBottom} color="info">
                        {values.infoHelpMapping[key]}
                      </Form.Help>
                    ) : (
                      ""
                    )}

                    {touched[key] && !errors[key] ? (
                      <Form.Help color="success" style={FormHelpMarginBottom}>
                        Valid!
                      </Form.Help>
                    ) : (
                      ""
                    )}

                    {touched[key] && errors[key] ? (
                      <Form.Help color="danger" style={FormHelpMarginBottom}>
                        {errors[key]}
                      </Form.Help>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <Button type="submit" disabled={Object.keys(errors).length > 0}>
                Save Contact
              </Button>
              <Button type="button" onClick={handleReset}>
                Reset Form
              </Button>
              {isSubmitting ? (
                <Form.Help color="warning">Updating...</Form.Help>
              ) : errors.general ? (
                <Form.Help color="danger">
                  There was an error: {errors.general}
                </Form.Help>
              ) : status.hasSaved ? (
                <Form.Help color="success">
                  Saved!{" "}
                  {`(${status.lastSave.toLocaleTimeString()} ${status.lastSave.toLocaleDateString()})`}
                </Form.Help>
              ) : (
                <Form.Help style={{ visibility: "hidden" }}>
                  Hidden field to prevent layout shift.
                </Form.Help>
              )}
            </form>
          )}
        </Formik>
      </Content>
    </>
  );
};

export default ContactFormFormik;
