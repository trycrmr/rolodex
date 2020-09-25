import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Edit from "./views/Edit.jsx";
import View from "./views/View.jsx";
import Home from "./views/Home.jsx";
import Add from "./views/Add.jsx";
import Delete from "./views/Delete.jsx";
import { Navbar } from "react-bulma-components";
import PageLayout from "./PageLayout";
const Nav = () => {
  return (
    <>
      <Router>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item renderAs="div">
              <Link to="/">Rolodex</Link>
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Container position="end">
            <Navbar.Item renderAs="div">
              <Link to="/add">Add Contact</Link>
            </Navbar.Item>{" "}
          </Navbar.Container>
        </Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/edit/:contactId">
            <PageLayout>
              <Edit />
            </PageLayout>
          </Route>
          <Route path="/add">
            <PageLayout>
              <Add />
            </PageLayout>
          </Route>
          <Route path="/delete/:contactId">
            <PageLayout>
              <Delete />
            </PageLayout>
          </Route>
          <Route path="/view/:contactId">
            <PageLayout>
              <View />
            </PageLayout>
          </Route>
          <Route path="/">
            <PageLayout>
              <Home />
            </PageLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Nav;
