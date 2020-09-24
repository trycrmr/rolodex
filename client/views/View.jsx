import React from "react";
import ContactView from "../ContactView";
import { useRouteMatch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const View = () => {
  let { contactId } = useParams();
  const data = useSelector((state) => state.app.data.contacts).find(
    (thisContact) => thisContact.id === contactId
  );

  return (
    <>
      <ContactView data={data} />
    </>
  );
};

export default View;
