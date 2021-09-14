import {
  CLEAR_ERROR,
  START_DATA_FETCH,
  RECEIVE_QUESTION,
  ADD_ERROR,
  FINISH_DATA_FETCH,
} from './constants'
import axios from '../../utils/axios'

export default (quizId, username, reCaptchaToken) => dispatch => {
  dispatch({ type: CLEAR_ERROR })
  dispatch({ type: START_DATA_FETCH })

  axios
    .get('/api/quiz/start', {
      params: {
        quizId,
        username,
        reCaptchaToken,
      },
    })
    .then(response => {
      dispatch({
        type: RECEIVE_QUESTION,
        question: response.data,
        questionNumber: 0,
      })
      dispatch({ type: CLEAR_ERROR })
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
