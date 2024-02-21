import { hideLoading, showLoading } from "react-redux-loading-bar";
import { login } from "../../utils/_DATA";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleLogin(username, password) {
  return async (dispatch) => {
    dispatch(showLoading());

    return login(username, password)
      .then((id) => dispatch(setAuthedUser(id)))
      .then(() => {
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(hideLoading());
        throw err;
      });
  };
}

export function handleLogOut() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(setAuthedUser(null));
    dispatch(hideLoading());
  };
}
