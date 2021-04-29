import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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

// Styles
import Container from '../components/create/styles/Container'
import QuestionNumber from '../styles/QuestionNumber'

// Utilities
import regexes from '../utils/regexes'
const { regexQuestionText, regexQuestionAnswer } = regexes

const initialQuestionText = 'Type the question here'
const initialAnswer = 'Type the answer here'

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

  const [text, setText] = useState(initialQuestionText)
  const [questionError, setQuestionError] = useState('')

  const [answers, setAnswers] = useState([
    initialAnswer,
    initialAnswer,
    initialAnswer,
    initialAnswer,
  ])

  const [answersErrors, setAnswerErrors] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState(0)

  const areThereErrors = !!(
    questionError ||
    answersErrors[0] ||
    answersErrors[1] ||
    answersErrors[2] ||
    answersErrors[3]
  )

  const history = useHistory()

  useEffect(() => {
    if (!regexes.regexQuizTitle.test(title)) {
      history.push('/')
    }

    // Questions have to be added in order. User should not be allowed to add e.g. question 5 before question 4.
    if (
      maxCorrectQuestionNumber < questionNumber ||
      questionNumber < 1 ||
      !regexes.regexQuestionNumber.test(questionNumber)
    ) {
      history.push(`/createquiz/${maxCorrectQuestionNumber}`)
    }
  }, [history, maxCorrectQuestionNumber, questionNumber, title])

  useEffect(() => {
    if (question) {
      setText(question.text)
      setAnswers(question.answers)
      setCorrectAnswer(question.correctAnswer)
    }
  }, [question])

  useEffect(() => {
    if (id !== '') {
      history.push('/quizsummary')
    }
  }, [id, history])

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

  const prohibitNewline = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }

  const headToQuestion = questionNumber => {
    history.push(`/createquiz/${questionNumber}`)
  }

  const handleNextQuestion = () => {
    modifyQuestion(text, answers, correctAnswer)

    headToQuestion(questionNumberCorrectType + 1)
  }

  const handlePreviousQuestion = () => {
    modifyQuestion(text, answers, correctAnswer)

    headToQuestion(questionNumberCorrectType - 1)
  }

  const handleQuestionChange = questionIndex => {
    modifyQuestion(text, answers, correctAnswer)

    headToQuestion(questionIndex)
  }

  const handleQuestionDeletion = () => {
    if (question) {
      deleteQuestion()
    }
    if (questionNumberCorrectType + 1 >= maxCorrectQuestionNumber) {
      headToQuestion(questionNumberCorrectType - 1)
    }
  }

  const handleFinishQuiz = () => {
    modifyQuestion(text, answers, correctAnswer)
    finishQuizCreation()
  }

  return (
    <>
      <Container>
        <Dots handleQuestionChange={handleQuestionChange} />
        <DeleteQuestionButton
          onClick={handleQuestionDeletion}
          disabled={maxCorrectQuestionNumber === 1}
        />
        <QuestionNumber>{questionNumber}</QuestionNumber>
        <Question
          prohibitNewline={prohibitNewline}
          handleQuestionTextChange={handleQuestionTextChange}
          questionError={questionError}
          initialQuestionText={initialQuestionText}>
          {question && question.text}
        </Question>
        <Answers
          handleAnswerChange={handleAnswerChange}
          prohibitNewline={prohibitNewline}
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
        onClickPrevious={handlePreviousQuestion}
        disabledFinish={
          maxCorrectQuestionNumber === 1 ||
          (questionNumberCorrectType === 1 && maxCorrectQuestionNumber === 2) ||
          areThereErrors
        }
        onClickFinish={handleFinishQuiz}
        disabledNext={questionNumberCorrectType === 10 || areThereErrors}
        onClickNext={handleNextQuestion}
      />
    </>
  )
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
  finishQuizCreation: () => dispatch(finishQuizCreation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizPage)
