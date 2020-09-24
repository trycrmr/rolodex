import React from "react";
import Filter from "./Filter.jsx";
import ContactList from "./ContactList.jsx";
import { Footer, Container, Content, Section } from "react-bulma-components";

const PageLayout = (props) => {
  return (
    <>
      <Container>
        <Section>{props.children}</Section>
      </Container>
      <Footer>
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
