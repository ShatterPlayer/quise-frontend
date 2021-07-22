import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { Helmet } from 'react-helmet'

// Redux
import { connect } from 'react-redux'
import {
  modifyQuestion,
  deleteQuestion,
  finishQuizCreation,
} from '../redux/actions'

// Components
import Dots from '../components/create/Dots'
import DeleteQuestionButton from '../components/create/DeleteQuestionButton'
import Question from '../components/create/Question'
import Navigation from '../components/create/Navigation'
import CorrectAnswers from '../components/create/CorrectAnswers'
import Answers from '../components/create/Answers'
import CriticalError from '../components/shared/CriticalError'

// Hooks
import useTitleValidation from '../hooks/useTitleValidation'
import useOrderValidation from '../hooks/useOrderValidation'
import useCreationListener from '../hooks/useCreationListener'

// Styles
import Container from '../components/create/styles/Container'
import QuestionNumber from '../styles/QuestionNumber'

// Utilities
import regexes from '../utils/regexes'
import runReCAPTCHA from '../utils/runReCAPTCHA'
import { name as appName } from '../utils/appInfo'
const { regexQuestionText, regexQuestionAnswer } = regexes

const GlobalStyle = createGlobalStyle`
.grecaptcha-badge { 
    bottom: 120px !important; 
}
`

const initialQuestionText = 'Type the question here'
const initialAnswer = 'Type the answer here'
const initialAnswers = [
  initialAnswer,
  initialAnswer,
  initialAnswer,
  initialAnswer,
]

function CreateQuizPage({
  match,
  maxCorrectQuestionNumber,
  modifyQuestion,
  deleteQuestion,
  question,
  title,
  finishQuizCreation,
  id,
}) {
  const { questionNumber } = match.params
  const questionNumberCorrectType = Number(questionNumber)

  const history = useHistory()

  const recaptcha = useRef()

  const [text, setText] = useState(initialQuestionText)
  const [questionError, setQuestionError] = useState('')

  const [answers, setAnswers] = useState(initialAnswers)

  const [answersErrors, setAnswerErrors] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState(0)

  const areThereErrors = !!(
    questionError ||
    answersErrors[0] ||
    answersErrors[1] ||
    answersErrors[2] ||
    answersErrors[3]
  )

  useTitleValidation(title, questionNumber)
  useOrderValidation(maxCorrectQuestionNumber, questionNumber)

  // Draft question is synced with the question in the Redux store
  useEffect(() => {
    if (question) {
      setText(question.text)
      setAnswers(question.answers)
      setCorrectAnswer(question.correctAnswer)
    } else {
      setText(initialQuestionText)
      setAnswers(initialAnswers)
      setCorrectAnswer(0)
    }
  }, [question, questionNumber])

  // After quiz creation id is added and user should be redirected to summary page
  useCreationListener(id)

  const handleQuestionTextChange = e => {
    setText(e.target.innerText)
    if (!regexQuestionText.test(e.target.innerText)) {
      setQuestionError('Question must be 1 to 100 characters and alphanumeric')
    } else if (questionError !== '') {
      setQuestionError('')
    }
  }

  const handleAnswerChange = (e, index) => {
    const text = e.target.innerText
    const newAnswers = [...answers]
    newAnswers[index] = text
    setAnswers(newAnswers)
    if (!regexQuestionAnswer.test(text)) {
      const error = [...answersErrors]
      error[index] = 'Answer must be 1 to 70 characters long and alphanumeric'
      setAnswerErrors(error)
    } else if (answersErrors[index] !== '') {
      const error = [...answersErrors]
      error[index] = ''
      setAnswerErrors(error)
    }
  }

  const handleQuestionChange = questionIndex => {
    modifyQuestion(text, answers, correctAnswer)

    history.push(`/createquiz/${questionIndex}`)
  }

  const handleQuestionDeletion = () => {
    if (question) {
      deleteQuestion()
    }
    if (questionNumberCorrectType + 1 >= maxCorrectQuestionNumber) {
      history.push(`/createquiz/${questionNumberCorrectType - 1}`)
    }
  }

  const handleFinishQuiz = () => {
    modifyQuestion(text, answers, correctAnswer)
    runReCAPTCHA(recaptcha).then(token => {
      finishQuizCreation(token)
    })
  }

  return (
    <>
      <Container>
        <Helmet>
          <title>Create | {appName}</title>
        </Helmet>
        <Dots handleQuestionChange={handleQuestionChange} />
        <DeleteQuestionButton
          onClick={handleQuestionDeletion}
          disabled={
            maxCorrectQuestionNumber <= 2 && questionNumberCorrectType === 1
          }
        />
        <QuestionNumber>{questionNumber}</QuestionNumber>
        <Question
          key={questionNumberCorrectType}
          questionNumber={questionNumberCorrectType}
          handleQuestionTextChange={handleQuestionTextChange}
          questionError={questionError}
          initialQuestionText={initialQuestionText}>
          {question && question.text}
        </Question>
        <Answers
          key={questionNumberCorrectType + 1}
          handleAnswerChange={handleAnswerChange}
          initialAnswer={initialAnswer}
          answersErrors={answersErrors}
          question={question}
        />
        <CorrectAnswers
          setCorrectAnswer={setCorrectAnswer}
          correctAnswer={correctAnswer}
        />
      </Container>
      <Navigation
        disabledPrevious={questionNumberCorrectType === 1 || areThereErrors}
        disabledFinish={
          maxCorrectQuestionNumber === 1 ||
          (questionNumberCorrectType === 1 && maxCorrectQuestionNumber === 2) ||
          areThereErrors
        }
        changeQuestion={handleQuestionChange}
        finishQuiz={handleFinishQuiz}
        disabledNext={questionNumberCorrectType === 10 || areThereErrors}
      />
      <ReCAPTCHA
        size="invisible"
        sitekey="6LcDvfsaAAAAACXmFp5FoIQhSGIYnkg1M6bfVXQI"
        ref={recaptcha}
      />
      <CriticalError />
      <GlobalStyle />
    </>
  )
}

CreateQuizPage.propTypes = {
  match: PropTypes.object.isRequired,
  maxCorrectQuestionNumber: PropTypes.number.isRequired,
  modifyQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  question: PropTypes.object,
  title: PropTypes.string.isRequired,
  finishQuizCreation: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  question: state.newQuiz.questions[ownProps.match.params.questionNumber - 1],
  maxCorrectQuestionNumber: state.newQuiz.questions.length + 1,
  title: state.newQuiz.title,
  id: state.newQuiz.id,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyQuestion: (text, answers, correctAnswer) =>
    dispatch(
      modifyQuestion(
        text,
        answers,
        correctAnswer,
        ownProps.match.params.questionNumber - 1,
      ),
    ),
  deleteQuestion: () =>
    dispatch(deleteQuestion(ownProps.match.params.questionNumber - 1)),
  finishQuizCreation: token => dispatch(finishQuizCreation(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizPage)
