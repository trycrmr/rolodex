import React from "react";
import { Footer, Container, Content, Section } from "react-bulma-components";

const PageLayout = (props) => {
  return (
    <>
      <Container>
        <Section style={{ alignItems: "center", padding: "0px" }}>
          {props.children}
        </Section>
      </Container>
      <Footer style={{ backgroundColor: "white" }}>
        <Container>
          <Content style={{ textAlign: "center" }}>
            <p>A Terry Creamer production.</p>
          </Content>
        </Container>
      </Footer>
    </>
  );
};

export default PageLayout;
