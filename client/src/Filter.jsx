import React from "react";
import { Form } from "react-bulma-components";

const Filter = () => {
  const handleChange = (e) => {
    console.info("a change!", e);
  };
  return (
    <>
      <Form.Field>
        <Form.Control>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="gender"
            value="male"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other?</option>
          </Form.Select>
        </Form.Control>
        <Form.Control>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="gender"
            value="male"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other?</option>
          </Form.Select>
        </Form.Control>
      </Form.Field>
    </>
  );
};

export default Filter;
