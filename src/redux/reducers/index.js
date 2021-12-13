import { combineReducers } from 'redux'
import defaultState from '../defaultState'
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
  CLEAR_SOLVED_QUIZ,
  MARK_QUIZ_AS_NONEXISTENT,
} from '../actions/constants'

const title = (state = defaultState.title, action) => {
  switch (action.type) {
    case RECEIVE_QUIZ_TITLE:
      return action.title
    case CLEAR_SOLVED_QUIZ:
      return defaultState.title
    default:
      return state
  }
}

const quizDoesNotExist = (state = defaultState.quizDoesNotExist, action) => {
  switch (action.type) {
    case MARK_QUIZ_AS_NONEXISTENT:
      return true
    default:
      return state
  }
}

const numberOfQuestions = (state = defaultState.numberOfQuestions, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS_AMOUNT:
      return action.questionsAmount
    case CLEAR_SOLVED_QUIZ:
      return defaultState.numberOfQuestions
    default:
      return state
  }
}

const isFetchingData = (state = defaultState.isFetchingData, action) => {
  switch (action.type) {
    case START_DATA_FETCH:
      return true
    case FINISH_DATA_FETCH:
      return false
    default:
      return state
  }
}

const questions = (state = defaultState.questions, action) => {
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
    case CLEAR_SOLVED_QUIZ:
      return defaultState.questions
    default:
      return state
  }
}

const currentQuestion = (state = defaultState.currentQuestion, action) => {
  switch (action.type) {
    case NEXT_QUESTION_NUMBER:
      return state + 1
    case CLEAR_SOLVED_QUIZ:
      return defaultState.currentQuestion
    default:
      return state
  }
}

const error = (state = defaultState.error, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.error || 'Internal server error'
    case CLEAR_ERROR:
      return ''
    default:
      return state
  }
}

const isQuizDone = (state = defaultState.isQuizDone, action) => {
  switch (action.type) {
    case FINISH_QUIZ:
      return true
    case CLEAR_SOLVED_QUIZ:
      return defaultState.isQuizDone
    default:
      return state
  }
}

const leaderboardUsers = (state = defaultState.leaderboardUsers, action) => {
  switch (action.type) {
    case RECEIVE_LEADERBOARD:
      return action.users
    default:
      return state
  }
}

const newQuizTitle = (state = defaultState.newQuiz.title, action) => {
  switch (action.type) {
    case SET_NEW_QUIZ_TITLE:
      return action.title
    default:
      return state
  }
}

const newQuizQuestions = (state = defaultState.newQuiz.questions, action) => {
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

const newQuizId = (state = defaultState.newQuiz.id, action) => {
  switch (action.type) {
    case FINISH_QUIZ_CREATION:
      return action.id
    default:
      return state
  }
}

const newQuiz = (state = defaultState.newQuiz, action) => {
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
  quizDoesNotExist,
  numberOfQuestions,
  isQuizDone,
  isFetchingData,
  currentQuestion,
  questions,
  error,
  leaderboardUsers,
  newQuiz,
})
