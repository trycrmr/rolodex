import { createSlice } from "@reduxjs/toolkit";
export const appSlice = createSlice({
  name: "app", // Would need to change this name if the codebase reaches enough complexity to warrant splitting this "slice" (and, by extension, it's reducer) into multiple slices.
  initialState: {
    contacts: [],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    updateContacts: (state, action) => {
      state.contacts = action.payload;
    },
    updateContact: (state, action) => {
      const newContactList = [
        ...state.contacts.filter(
          (thisContact) => thisContact.id !== action.payload.id
        ),
        action.payload,
      ];
      state = { ...state, contacts: newContactList };
    },
    deleteContact: (state, action) => {
      const newContactList = [
        ...state.contacts.filter(
          (thisContact) => thisContact.id !== action.payload.id
        ),
      ];
      state = { ...state, contacts: newContactList };
    },
  },
});

export const {
  updateContacts,
  updateContact,
  deleteContact,
} = appSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => { // Left in as an example
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a data from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.app.data)`
// export const selectCount = (state) => state.app.count; // Left in as an example

export default appSlice.reducer;
