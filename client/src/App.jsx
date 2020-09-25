// import { hot } from "react-hot-loader/root";
import React from "react";
import Nav from "./Nav.jsx";
import { Container } from "react-bulma-components";

const App = (props) => {
  // A production app would do something smarter with the custom styles than having anything besides Bulma's defaults inline. Bulma's react components looks pretty good on their own, so fortunately the amount of inline styles isn't aggregious and I could still get the "business card" look in the list.
  return (
    <Container style={{ maxWidth: "1100px" }}>
      <Nav />
    </Container>
  );
};

export default App;
