import {
  ADD_QUESTION_ANSWER_TO_USER,
  ADD_QUESTION_TO_USER,
  RECEIVE_USERS,
} from "../Actions/Users";

export default function Users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case ADD_QUESTION_TO_USER: {
      const { authedUser, qid } = action;
      const userQuestions = state[authedUser]?.questions || [];
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: userQuestions.concat([qid]),
        },
      };
    }
    case ADD_QUESTION_ANSWER_TO_USER: {
      const { authedUser, qid, answer } = action;
      const userAnswers = state[authedUser]?.answers || [];
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: { ...userAnswers, [qid]: answer },
        },
      };
    }

    default:
      return state;
  }
}
