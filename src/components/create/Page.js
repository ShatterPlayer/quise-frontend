/*
  TODO: Component is to complex. Refactor it.
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Answer from './Answer'
import DeleteQuestionButton from './DeleteQuestionButton'
import Dots from './Dots'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import Navigation from './Navigation'

// Styles
import QuestionNumber from '../../styles/QuestionNumber'
import AnswersWrapper from '../../styles/AnswersWrapper'
import Container from './styles/Container'
import AnswerError from './styles/AnswerError'

const AnswersWrapperWithMargin = styled(AnswersWrapper)`
  margin: 20px 0;
`

const AnswerWrapper = styled.div`
  position: relative;
`

const CorrectAnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
`

const CorrectAnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

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
  answerErrors,
  setCorrectAnswer,
  correctAnswer,
  handlePreviousQuestion,
  handleNextQuestion,
  handleQuestionChange,
  theme,
  prohibitNewline,
  handleFinishQuiz,
  isFetchingData,
}) {
  const answersColors = [
    theme.colors.blue,
    theme.colors.yellow,
    theme.colors.red,
    theme.colors.orange,
  ]

  return (
    <>
      <Container>
        <Dots handleQuestionChange={handleQuestionChange} />
        <DeleteQuestionButton
          onClick={!isFetchingData && handleQuestionDeletion}
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
        <AnswersWrapperWithMargin>
          {answersColors.map((color, index) => (
            <AnswerWrapper key={color}>
              <Answer
                onInput={e => handleAnswerChange(e, index)}
                onBlur={e => handleAnswerChange(e, index)}
                onKeyDown={prohibitNewline}
                editable={!isFetchingData}
                backgroundColor={color}>
                {question ? question.answers[index] : initialAnswer}
              </Answer>
              <AnswerError>{answerErrors[index]}</AnswerError>
            </AnswerWrapper>
          ))}
        </AnswersWrapperWithMargin>
        <CorrectAnswersContainer>
          Correct answer
          <CorrectAnswerWrapper>
            {answersColors.map((color, index) => (
              <CorrectAnswer
                key={color}
                color={color}
                setCorrectAnswer={setCorrectAnswer}
                index={index}
                correctAnswer={correctAnswer}
              />
            ))}
          </CorrectAnswerWrapper>
        </CorrectAnswersContainer>
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
  answerErrors: PropTypes.array.isRequired,
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
