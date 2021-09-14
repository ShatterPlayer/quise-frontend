import {
  START_DATA_FETCH,
  SUBMIT_ANSWER,
  FINISH_QUIZ,
  RECEIVE_QUESTION,
  RECEIVE_CORRECT_ANSWER,
  ADD_ERROR,
  FINISH_DATA_FETCH,
} from './constants'
import axios from '../../utils/axios'

export default (answer, questionNumber) => dispatch => {
  dispatch({ type: START_DATA_FETCH })
  dispatch({ type: SUBMIT_ANSWER, answer, questionNumber })

  axios
    .get('/api/quiz/nextquestion', {
      params: {
        answer,
        questionNumber,
      },
    })
    .then(response => {
      if (response.data.isQuizDone === true) {
        dispatch({ type: FINISH_QUIZ })
      } else {
        dispatch({
          type: RECEIVE_QUESTION,
          question: response.data.nextQuestion,
          questionNumber: response.data.nextQuestion.questionNumber,
        })
      }
      dispatch({
        type: RECEIVE_CORRECT_ANSWER,
        correctAnswer: response.data.correctAnswer,
        questionNumber,
      })
    })
    .catch(error => {
      console.log(error)
      error.response.data.message &&
        dispatch({ type: ADD_ERROR, error: error.response.data.message })
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
