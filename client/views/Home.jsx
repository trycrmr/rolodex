import React from "react";
import ContactList from "../ContactList";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { updateContacts } from "../appSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { data, error } = useSWR("/contacts"); // save in redux state
  if (data) dispatch(updateContacts(data));
  return (
    <>
      {error ? (
        <div>oh dear, {error.toString()}</div>
      ) : !data ? (
        <div>...loading contacts...</div>
      ) : (
        <ContactList data={data} />
      )}
      Filter
    </>
  );
};

export default Home;
