import { hot } from "react-hot-loader/root";
import React from "react";
import { useDispatch } from "react-redux";
import { Counter } from "./Counter.jsx";
import Nav from "./Nav.jsx";


const App = (props) => {
  return (
    <div>
      <Nav />
      <p>wee bloop blop woop</p>
      <Counter />
    </div>
  );
};

export default hot(App);
