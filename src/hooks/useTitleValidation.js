import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import regexes from '../utils/regexes'

const useTitleValidation = (title, questionNumber) => {
  const history = useHistory()
  useEffect(() => {
    if (!regexes.regexQuizTitle.test(title)) {
      history.push('/')
    }
  }, [history, title, questionNumber])
}

export default useTitleValidation
