/*
  TODO: Component is to complex. Refactor it.
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// Components
import Answer from './Answer'
import DeleteQuestionButton from './DeleteQuestionButton'
import Loader from '../shared/Loader'
import Dots from './Dots'
import Question from './Question'

// Images
import correctAnswerImage from '../../images/correctAnswer.svg'

// Styles
import QuestionNumber from '../../styles/QuestionNumber'
import AnswersWrapper from '../../styles/AnswersWrapper'
import Container from './styles/Container'
import AnswerError from './styles/AnswerError'

const Navigation = styled.nav`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
`

const NavButton = styled.button`
  flex: 1;
  background-color: ${props =>
    props.finish ? props.theme.colors.green : props.theme.colors.blue};
  border: none;
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  cursor: pointer;

  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`

const AnswersWrapperWithMargin = styled(AnswersWrapper)`
  margin: 20px 0;
`

const AnswerWrapper = styled.div`
  position: relative;
`

const CorrectAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
`

const CorrectAnswerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

const CorrectAnswerBlock = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
`

const CorrectAnswerMark = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: url(${correctAnswerImage});
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
`

function Page({
  disabledPreviousQuestion,
  disabledNextQuestion,
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
  maxCorrectQuestionNumber,
  handleFinishQuizCreation,
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
        <CorrectAnswer>
          Correct answer
          <CorrectAnswerContainer>
            {answersColors.map((color, index) => (
              <CorrectAnswerBlock
                key={color}
                backgroundColor={color}
                onClick={e => !isFetchingData && setCorrectAnswer(index)}>
                {correctAnswer === index && (
                  <CorrectAnswerMark
                    variants={{
                      hidden: {
                        opacity: 0,
                        width: '0%',
                        height: '0%',
                      },
                      visible: {
                        opacity: 1,
                        width: '100%',
                        height: '100%',
                      },
                    }}
                    transition={{ type: 'spring', stiffness: 700 }}
                    initial="hidden"
                    animate="visible"
                  />
                )}
              </CorrectAnswerBlock>
            ))}
          </CorrectAnswerContainer>
        </CorrectAnswer>
      </Container>
      <Navigation>
        {isFetchingData && <Loader small />}
        <NavButton
          disabled={disabledPreviousQuestion || isFetchingData}
          onClick={handlePreviousQuestion}>
          Previous
        </NavButton>
        <NavButton
          disabled={disabledFinishButton || isFetchingData}
          onClick={handleFinishQuizCreation}
          finish>
          Finish
        </NavButton>
        <NavButton disabled={disabledNextQuestion} onClick={handleNextQuestion}>
          Next
        </NavButton>
      </Navigation>
    </>
  )
}

Page.propTypes = {
  disabledPreviousQuestion: PropTypes.bool.isRequired,
  disabledNextQuestion: PropTypes.bool.isRequired,
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
  handleFinishQuizCreation: PropTypes.func.isRequired,
}

export default Page
