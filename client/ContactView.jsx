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
} from "react-bulma-components";

const ContactView = (props) => {
  return (
    <>
      <Box style={{ minWidth: "fit-content" }}>
        <Section>
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
