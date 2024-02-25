import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./Reducers/AuthedUser";
import users from "./Reducers/Users";
import questions from "./Reducers/Questions";

export const store = configureStore({
  reducer: {
    authedUser,
    users,
    questions,
  },
});
