import React from "react";
import ContactView from "../ContactView";
import { useRouteMatch, useParams } from "react-router-dom";

const View = () => {
  let { contactId } = useParams();

  return (
    <>
      {contactId}
      <ContactView />
    </>
  );
};

export default View;
