import React from 'react'
import PropTypes from 'prop-types'

// Components

import DeleteQuestionButton from './DeleteQuestionButton'
import Dots from './Dots'
import Question from './Question'
import Navigation from './Navigation'
import CorrectAnswers from './CorrectAnswers'
import Answers from './Answers'

// Styles
import QuestionNumber from '../../styles/QuestionNumber'
import Container from './styles/Container'

function Page({
  disabledPreviousButton,
  disabledNextButton,
  disabledFinishButton,
  disabledDeletionButton,
  question,
  initialAnswer,
  initialQuestionText,
  handleQuestionDeletion,
  questionNumber,
  handleQuestionTextChange,
  questionError,
  handleAnswerChange,
  answersErrors,
  setCorrectAnswer,
  correctAnswer,
  handlePreviousQuestion,
  handleNextQuestion,
  handleQuestionChange,
  prohibitNewline,
  handleFinishQuiz,
}) {
  return (
    <>
      <Container>
        <Dots handleQuestionChange={handleQuestionChange} />
        <DeleteQuestionButton
          onClick={handleQuestionDeletion}
          disabled={disabledDeletionButton}
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
        disabledPrevious={disabledPreviousButton}
        onClickPrevious={handlePreviousQuestion}
        disabledFinish={disabledFinishButton}
        onClickFinish={handleFinishQuiz}
        disabledNext={disabledNextButton}
        onClickNext={handleNextQuestion}
      />
    </>
  )
}

Page.propTypes = {
  disabledPreviousButton: PropTypes.bool.isRequired,
  disabledNextButton: PropTypes.bool.isRequired,
  disabledFinishButton: PropTypes.bool.isRequired,
  disabledDeletionButton: PropTypes.bool.isRequired,
  question: PropTypes.object,
  initialAnswer: PropTypes.string.isRequired,
  initialQuestionText: PropTypes.string.isRequired,
  handleQuestionDeletion: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  handleQuestionTextChange: PropTypes.func.isRequired,
  questionError: PropTypes.string.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
  answersErrors: PropTypes.array.isRequired,
  setCorrectAnswer: PropTypes.func.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  handlePreviousQuestion: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
  prohibitNewline: PropTypes.func.isRequired,
  maxCorrectQuestionNumber: PropTypes.number.isRequired,
  handleFinishQuiz: PropTypes.func.isRequired,
}

export default Page
