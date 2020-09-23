import React from "react";
import { Navbar, Footer, Container, Content } from "react-bulma-components";

function PageLayout() {
  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/">
            Rolodex
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
            <Navbar.Item href="#">At the end</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
      <Container>Container</Container>
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
