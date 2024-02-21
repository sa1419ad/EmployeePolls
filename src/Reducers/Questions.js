import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ANSWER_QUESTION,
} from "../Actions/Questions";

export default function Questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

    case ANSWER_QUESTION:
      const { authedUser, qid, answer } = action;
      const question = state[qid];

      const userOldAnswers = question["optionOne"].votes.includes(authedUser)
        ? "optionOne"
        : question["optionTwo"].votes.includes(authedUser)
        ? "optionTwo"
        : null;

      return {
        ...state,
        [qid]: {
          ...question,

          [userOldAnswers ?? answer]: {
            ...question[userOldAnswers ?? answer],
            votes: question[userOldAnswers ?? answer].votes.filter(
              (voter) => voter !== authedUser
            ),
          },

          [answer]: {
            ...question[answer],
            votes: question[answer].votes.concat([authedUser]),
          },
        },
      };

    default:
      return state;
  }
}
