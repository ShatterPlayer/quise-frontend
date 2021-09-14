import { MODIFY_QUESTION } from './constants'

export default (text, answers, correctAnswer, questionNumber) => ({
  type: MODIFY_QUESTION,
  text,
  answers,
  correctAnswer,
  questionNumber,
})
