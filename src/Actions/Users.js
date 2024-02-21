export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_QUESTION_ANSWER_TO_USER = "ADD_QUESTION_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export const addQuestionToUser = (authedUser, qid) => {
  return {
    type: ADD_QUESTION_TO_USER,
    authedUser,
    qid,
  };
};

export const addQuestionAnswerToUser = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
};
