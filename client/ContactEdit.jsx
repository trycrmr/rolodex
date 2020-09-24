import React from "react";
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
  Input,
} from "react-bulma-components";

// Warning: Failed prop type: Invalid prop `type` of value `phone` supplied to `Input`, expected one of ["text","email","tel","password","number","search","color","date","time","datetime-local"].

const ContactEdit = (props) => {
  const inputMapping = {
    phone: "tel",
    name: "text",
    email: "email",
  };
  return (
    <>
      <Box style={{ minWidth: "fit-content" }}>
        <Section>
          <Button>Save Contact</Button>
          <Hero>
            <Heading style={{ textAlign: "center" }}>{props.data.name}</Heading>
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
                        <Form.Control>
                          <Form.Field disabled={false} value={value}>
                            <Form.Label>{key}</Form.Label>
                            <Form.Input
                              type={inputMapping[key]}
                              placeholder={key}
                              value={value}
                            />
                          </Form.Field>
                        </Form.Control>
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

export default ContactEdit;
