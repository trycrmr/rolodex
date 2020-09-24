import React from "react";
import ContactEdit from "../ContactEdit";
import { useRouteMatch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Edit = () => {
  let { contactId } = useParams();
  const data = useSelector((state) => state.app.data.contacts).find(
    (thisContact) => thisContact.id === contactId
  );

  return (
    <>
      <ContactEdit data={data} />
    </>
  );
};

export default Edit;
