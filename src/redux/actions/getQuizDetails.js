import axios from '../../utils/axios'
import {
  START_DATA_FETCH,
  RECEIVE_QUIZ_TITLE,
  RECEIVE_QUESTIONS_AMOUNT,
  ADD_ERROR,
  FINISH_DATA_FETCH,
  MARK_QUIZ_AS_NONEXISTENT,
} from './constants'

export default quizId => dispatch => {
  dispatch({ type: START_DATA_FETCH })

  axios
    .get('/api/quiz', {
      params: {
        quizId,
      },
    })
    .then(response => {
      const { title, questionsAmount } = response.data
      dispatch({ type: RECEIVE_QUIZ_TITLE, title })
      dispatch({ type: RECEIVE_QUESTIONS_AMOUNT, questionsAmount })
    })
    .catch(error => {
      error.response.data.message &&
        dispatch({ type: ADD_ERROR, error: error.response.data.message })

      if (error.response.status === 404) {
        dispatch({ type: MARK_QUIZ_AS_NONEXISTENT })
      }
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
