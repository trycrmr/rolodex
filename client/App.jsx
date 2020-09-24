import { hot } from "react-hot-loader/root";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { pleaseToggleBool } from "./appSlice";
import { Counter } from "./Counter.jsx";
import PageLayout from "./PageLayout.jsx";
import Nav from "./Nav.jsx";

const App = (props) => {
  // console.info(pleaseToggleBool);
  // const dispatch = useDispatch();
  // const currentBool = useSelector((state) => state.app.bool);
  // console.info(currentBool);
  return (
    <div>
      <Nav />
      <p>wee bloop blop woop</p>
      <Counter />
    </div>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default hot(App);
