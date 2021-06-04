import axios from 'axios'
export const START_DATA_FETCH = 'START_DATA_FETCH'
export const FINISH_DATA_FETCH = 'FINISH_DATA_FETCH'
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'
export const ADD_ERROR = 'ADD_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FINISH_QUIZ = 'FINISH_QUIZ'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const RECEIVE_CORRECT_ANSWER = 'RECEIVE_CORRECT_ANSWER'
export const NEXT_QUESTION_NUMBER = 'NEXT_QUESTION_NUMBER'
export const RECEIVE_QUIZ_TITLE = 'RECEIVE_QUIZ_TITLE'
export const RECEIVE_QUESTIONS_AMOUNT = 'RECEIVE_QUESTIONS_AMOUNT'
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD'
export const SET_NEW_QUIZ_TITLE = 'SET_NEW_QUIZ_TITLE'
export const MODIFY_QUESTION = 'MODIFY_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const FINISH_QUIZ_CREATION = 'FINISH_QUIZ_CREATION'

export const startQuiz = (quizId, username, reCaptchaToken) => dispatch => {
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

export const nextQuestion = (answer, questionNumber) => dispatch => {
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

export const getQuizDetails = quizId => dispatch => {
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

export const nextQuestionNumber = () => ({
  type: NEXT_QUESTION_NUMBER,
})

export const getLeaderboard = quizId => dispatch => {
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

export const setNewQuizTitle = title => ({
  type: SET_NEW_QUIZ_TITLE,
  title,
})

export const addError = message => ({
  type: ADD_ERROR,
  error: message,
})

export const clearError = () => ({
  type: CLEAR_ERROR,
})

export const modifyQuestion = (
  text,
  answers,
  correctAnswer,
  questionNumber,
) => ({
  type: MODIFY_QUESTION,
  text,
  answers,
  correctAnswer,
  questionNumber,
})

export const deleteQuestion = index => ({
  type: DELETE_QUESTION,
  index,
})

export const finishQuizCreation = recaptchaToken => (dispatch, getState) => {
  dispatch({ type: START_DATA_FETCH })

  const { newQuiz } = getState()

  axios
    .post('/api/quiz', { recaptchaToken, ...newQuiz })
    .then(response => {
      const { id } = response.data
      dispatch({ type: FINISH_QUIZ_CREATION, id })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: ADD_ERROR, error: error.response.data.message })
    })
    .finally(() => {
      dispatch({ type: FINISH_DATA_FETCH })
    })
}
