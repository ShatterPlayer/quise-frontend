import { combineReducers } from 'redux'
import {
  START_DATA_FETCH,
  FINISH_DATA_FETCH,
  RECEIVE_QUESTION,
  ADD_ERROR,
  CLEAR_ERROR,
  FINISH_QUIZ,
  SUBMIT_ANSWER,
  RECEIVE_CORRECT_ANSWER,
  NEXT_QUESTION_NUMBER,
  RECEIVE_QUIZ_TITLE,
  RECEIVE_QUESTIONS_AMOUNT,
  RECEIVE_LEADERBOARD,
  SET_NEW_QUIZ_TITLE,
  MODIFY_QUESTION,
  DELETE_QUESTION,
  FINISH_QUIZ_CREATION,
} from '../actions'

const title = (state = '-', action) => {
  switch (action.type) {
    case RECEIVE_QUIZ_TITLE:
      return action.title
    default:
      return state
  }
}

const numberOfQuestions = (state = 0, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS_AMOUNT:
      return action.questionsAmount
    default:
      return state
  }
}

const isFetchingData = (state = false, action) => {
  switch (action.type) {
    case START_DATA_FETCH:
      return true
    case FINISH_DATA_FETCH:
      return false
    default:
      return state
  }
}

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTION:
      return {
        ...state,
        [action.questionNumber]: action.question,
      }
    case SUBMIT_ANSWER:
      const stateWithAnswer = { ...state }
      stateWithAnswer[action.questionNumber].answer = action.answer
      return stateWithAnswer
    case RECEIVE_CORRECT_ANSWER:
      const stateWithCorrectAnswer = { ...state }
      stateWithCorrectAnswer[action.questionNumber].correctAnswer =
        action.correctAnswer
      return stateWithCorrectAnswer
    default:
      return state
  }
}

const currentQuestion = (state = 0, action) => {
  switch (action.type) {
    case NEXT_QUESTION_NUMBER:
      return state + 1
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.error || 'Internal server error'
    case CLEAR_ERROR:
      return ''
    default:
      return state
  }
}

const isQuizDone = (state = false, action) => {
  switch (action.type) {
    case FINISH_QUIZ:
      return true
    default:
      return state
  }
}

const leaderboardUsers = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LEADERBOARD:
      return action.users
    default:
      return state
  }
}

const newQuizTitle = (state = '-', action) => {
  switch (action.type) {
    case SET_NEW_QUIZ_TITLE:
      return action.title
    default:
      return state
  }
}

const newQuizQuestions = (state = [], action) => {
  switch (action.type) {
    case MODIFY_QUESTION:
      const { text, answers, correctAnswer, questionNumber } = action
      const newQuestions0 = [...state]
      newQuestions0[questionNumber] = {
        text,
        answers,
        correctAnswer,
      }
      return newQuestions0
    case DELETE_QUESTION:
      const { index } = action
      const newQuestions1 = [...state]
      newQuestions1.splice(index, 1)
      return newQuestions1
    default:
      return state
  }
}

const newQuizId = (state = '', action) => {
  switch (action.type) {
    case FINISH_QUIZ_CREATION:
      return action.id
    default:
      return state
  }
}

const newQuiz = (
  state = {
    title: '-',
    questions: [],
    id: '',
  },
  action,
) => {
  switch (action.type) {
    case SET_NEW_QUIZ_TITLE:
      return {
        ...state,
        title: newQuizTitle(state.title, action),
      }
    case MODIFY_QUESTION:
    case DELETE_QUESTION:
      return {
        ...state,
        questions: newQuizQuestions(state.questions, action),
      }

    case FINISH_QUIZ_CREATION:
      return {
        ...state,
        id: newQuizId(state.id, action),
      }
    default:
      return state
  }
}

export default combineReducers({
  title,
  numberOfQuestions,
  isQuizDone,
  isFetchingData,
  currentQuestion,
  questions,
  error,
  leaderboardUsers,
  newQuiz,
})
