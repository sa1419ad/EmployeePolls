import { receiveQuestions } from "./Questions";
import { receiveUsers } from "./Users";
import { setAuthedUser } from "./AuthedUser";
import { _getUsers, _getQuestions } from "../../utils/_DATA";

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
        dispatch(setAuthedUser(null));
      }
    );
  };
}
