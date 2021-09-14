import axios from '../../utils/axios'
import {
  START_DATA_FETCH,
  RECEIVE_LEADERBOARD,
  RECEIVE_QUIZ_TITLE,
  ADD_ERROR,
  FINISH_DATA_FETCH,
} from './constants'

export default quizId => dispatch => {
  dispatch({ type: START_DATA_FETCH })
  axios
    .get('/api/quiz/leaderboard', { params: { quizId } })
    .then(res => {
      const { users, title } = res.data
      const newUsers = users.map(user => ({
        ...user,
        correctAnswers: user.answers.reduce(
          (sum, answer) => (answer ? sum + 1 : sum),
          0,
        ),
      }))
      const sortedUsers = newUsers.sort((a, b) => {
        if (
          a.correctAnswers < b.correctAnswers ||
          (a.answers.length < b.answers.length &&
            a.correctAnswers === b.correctAnswers)
        ) {
          return 1
        } else if (
          a.correctAnswers > b.correctAnswers ||
          (a.answers.length > b.answers.length &&
            a.correctAnswers === b.correctAnswers)
        ) {
          return -1
        } else {
          return 0
        }
      })
      dispatch({ type: RECEIVE_LEADERBOARD, users: sortedUsers })
      dispatch({ type: RECEIVE_QUIZ_TITLE, title })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: ADD_ERROR, error: error.response.data.message })
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
