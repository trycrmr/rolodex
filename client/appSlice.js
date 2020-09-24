import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const get = axios.get;

export const appSlice = createSlice({
  name: "app",
  initialState: {
    data: { contacts: [], isFetching: false },
    count: 0,
  },
  reducers: {
    updateContacts: (state, action) => {
      state.data.contacts = action.payload;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.data += action.payload;
    },
  },
});

export const {
  updateContacts,
  increment,
  decrement,
  incrementByAmount,
} = appSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// export const fetchContacts = () => (dispatch) => {
//   dispatch(
//     addContact({
//       name: "President Bartlet",
//       email: "pres@whitehouse.gov",
//       phone: "202-111-1111",
//       uuid: "potus",
//     })
//   );
// };

// const results = Array(count)
// .fill(0)
// .map((undefined, currIdx) => currIdx);
// const iterator = results[Symbol.iterator]();

// let isDone = false;
// while (!isDone) {
// let { value, done } = iterator.next();
// if (done) {
//   isDone = done;
//   break;
// }
// let result = await Promise.allSettled([
//   request.get("https://randomuser.me/api/"),
// ]);
// result =
//   result[0].status === "fulfilled"
//     ? result[0].value.data.results[0]
//     : result[0].reason;
// results[value] = result;
// }
// return results;

// The function below is called a selector and allows us to select a data from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.app.data)`
export const selectCount = (state) => state.app.count;

export default appSlice.reducer;
