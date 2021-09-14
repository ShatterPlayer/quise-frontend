import { START_DATA_FETCH, FINISH_DATA_FETCH } from './constants'
import axios from '../../utils/axios'
import deleteQuizFromLocalStorage from '../../utils/deleteQuizFromLocalStorage'
import addError from './addError'

export default quizId => dispatch => {
  dispatch({ type: START_DATA_FETCH })
  return axios
    .delete('/api/quiz', {
      params: {
        quizId,
      },
    })
    .then(() => {
      deleteQuizFromLocalStorage(quizId)
    })
    .catch(e => {
      dispatch(addError(e.response.data.message))
    })
    .finally(() => {
      deleteQuizFromLocalStorage(quizId)
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
