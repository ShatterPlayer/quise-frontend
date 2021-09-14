import axios from '../../utils/axios'
import {
  START_DATA_FETCH,
  RECEIVE_QUIZ_TITLE,
  RECEIVE_QUESTIONS_AMOUNT,
  ADD_ERROR,
  FINISH_DATA_FETCH,
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
      console.log(error)
      error.response.data.message &&
        dispatch({ type: ADD_ERROR, error: error.response.data.message })
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
