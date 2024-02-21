import { hideLoading, showLoading } from "react-redux-loading-bar";
import { _saveQuestion, _saveQuestionAnswer } from "../../utils/_DATA";
import { addQuestionAnswerToUser, addQuestionToUser } from "./Users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return _saveQuestion(question)
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(authedUser, question.id));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  };
}

export function handleAnswerQuestion({ qid, answer }) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(answerQuestion(authedUser, qid, answer));
        dispatch(addQuestionAnswerToUser(authedUser, qid, answer));
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(hideLoading());
        throw err;
      });
  };
}
