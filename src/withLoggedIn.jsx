import { useSelector } from "react-redux";
import { withCondition } from "./withCondition";
import { useLocation } from "react-router-dom";

export function withLoggedIn(WrappedComponent) {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();
  return withCondition(WrappedComponent, authedUser, "/login", location);
}
