import { hot } from "react-hot-loader/root";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { pleaseToggleBool } from "./appSlice";
import { Counter } from "./Counter.jsx";
import PageLayout from "./PageLayout.jsx";

const App = (props) => {
  // console.info(pleaseToggleBool);
  // const dispatch = useDispatch();
  // const currentBool = useSelector((state) => state.app.bool);
  // console.info(currentBool);
  return (
    <div>
      <PageLayout></PageLayout>
      <p>wee bloop blop woop</p>
      <Counter />
    </div>
  );
};

export default hot(App);
