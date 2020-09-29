import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
});

const ContactFormFormik = () => {
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          console.info(values);
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name ? (
              <div id="feedback">{props.errors.name}</div>
            ) : (
              <div id="feedback" style={{ visibility: "hidden" }}>
                hidden to prevent layout shift
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactFormFormik;
