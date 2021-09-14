import axios from '../../utils/axios'
import addQuizToLocalStorage from '../../utils/addQuizToLocalStorage'
import {
  START_DATA_FETCH,
  FINISH_QUIZ_CREATION,
  ADD_ERROR,
  FINISH_DATA_FETCH,
} from './constants'

export default reCaptchaToken => (dispatch, getState) => {
  dispatch({ type: START_DATA_FETCH })

  const { newQuiz } = getState()

  axios
    .post('/api/quiz', { reCaptchaToken, ...newQuiz })
    .then(response => {
      const { id } = response.data
      dispatch({ type: FINISH_QUIZ_CREATION, id })
      addQuizToLocalStorage({ title: newQuiz.title, id })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: ADD_ERROR, error: error.response.data.message })
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
