import React from "react";
import ContactList from "../features/ContactList";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { updateContacts } from "../slices/appSlice";
const Home = () => {
  // This app would absolutely need some sort of auth layer to prevent user's from seeing other user's contacts. Would have to do that before deploying to production and some sort of auth check would happen somewhere around here before requesting the user's contacts.
  const dispatch = useDispatch();
  const { data, error } = useSWR(
    `http://${process.env.REACT_APP_LOCAL_API_ENDPOINT}/contacts`
  ); // My understanding is this "stale while revalidate" hook will return cached data first, then check to see if the data has updated on the server. This *should* present any data to the user as quickly as possible locally, then update with the latest data at the speed of however long the network call takes to complete.
  if (data) dispatch(updateContacts(data)); // Update the app state if there is any data
  return (
    <>
      {error ? (
        <div>
          Sorry to say there was an issue getting your contacts. Please check
          your internet connection, and contact support if the problem persists.
        </div> // Could probably handle this differently if this app were offline-first. Probably wouldn't hold up an initial deployment, but maybe could get a previous load of the user's contacts from the user's local storage. Also, no support contact at this time, obvi :-) . Would want one of those before deploying to production.
      ) : !data ? (
        <div>Loading your contacts...</div>
      ) : (
        <ContactList data={data} />
      )}
    </>
  );
};

export default Home;
