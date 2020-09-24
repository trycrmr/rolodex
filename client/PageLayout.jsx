import React from "react";
import Filter from "./Filter.jsx";
import ContactList from "./ContactList.jsx";
import { Footer, Container, Content, Section } from "react-bulma-components";

function PageLayout() {
  return (
    <>
      <Container>
        <Section>
          {/* <Filter /> */}
          <ContactList />
        </Section>
      </Container>
      <Footer>
        <Container>
          <Content style={{ textAlign: "center" }}>
            <p>
              <strong>Bulma</strong> by{" "}
              <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is
              licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
              </a>
              .
            </p>
          </Content>
        </Container>
      </Footer>
    </>
  );
}

export default PageLayout;
