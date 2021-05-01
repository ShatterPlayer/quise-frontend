import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import regexes from '../utils/regexes'

const useOrderValidation = (maxCorrectQuestionNumber, questionNumber) => {
  const history = useHistory()

  // Questions have to be added in order. User should not be allowed to add e.g. question 5 before question 4.
  useEffect(() => {
    if (
      maxCorrectQuestionNumber < questionNumber ||
      questionNumber < 1 ||
      !regexes.regexQuestionNumber.test(questionNumber)
    ) {
      history.push(`/createquiz/${maxCorrectQuestionNumber}`)
    }
  }, [maxCorrectQuestionNumber, questionNumber, history])
}

export default useOrderValidation
