import React from "react";
import ContactList from "../ContactList";
import useSWR from "swr";
const Home = () => {
  const { data, error } = useSWR("/contacts"); // save in redux state
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
