import React from "react";
import ContactView from "../ContactView";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const View = () => {
  let { contactId } = useParams();
  const data = useSelector((state) => state.app.contacts).find(
    (thisContact) => thisContact.id === contactId
  );

  return (
    <>
      <ContactView data={data} delete={false} />
    </>
  );
};

export default View;
