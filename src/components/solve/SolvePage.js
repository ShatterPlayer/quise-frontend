import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import styled, { withTheme, createGlobalStyle } from 'styled-components'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

// Components
import Button from '../shared/Button'
import AnswerButton from './AnswerButton'
import CriticalError from '../shared/CriticalError'

// Styles
import QuestionNumber from '../../styles/QuestionNumber'
import QuestionText from '../../styles/QuestionText'
import AnswersWrapper from '../../styles/AnswersWrapper'

// Hooks
import useUnloadAlert from '../../hooks/useUnloadAlert'

// The line below is necessary to prevent UI bug. Applying overflow hidden to ColoredBackground does not work as expected.
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const ColoredBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  width: 100vw;
  height: 100vh;
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
`

function Page({
  questionNumber,
  question,
  correctAnswer,
  isQuizDone,
  isLoading,
  error,
  submitAnswer,
  nextQuestionNumber,
  startDataFetch,
  theme,
}) {
  const history = useHistory()
  const { quizId } = useParams()
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  useUnloadAlert()
  const { green, yellow, red, orange } = theme.colors
  const answersColors = [green, yellow, red, orange]

  useEffect(() => {
    if (correctAnswer !== undefined) {
      setSelectedAnswer(-1)
      if (isQuizDone === false) {
        setTimeout(() => {
          nextQuestionNumber()
        }, 2000)
      } else {
        setTimeout(() => {
          // The line below prevents leaderboard from displaying before spinner
          startDataFetch()
          history.push(`/quiz/${quizId}/leaderboard`)
        }, 2000)
      }
    }
  }, [
    correctAnswer,
    history,
    isQuizDone,
    nextQuestionNumber,
    startDataFetch,
    quizId,
  ])

  const onCheck = () => {
    submitAnswer(selectedAnswer, questionNumber)
  }

  const onEnter = e => {
    e.key === 'Enter' && submitAnswer(selectedAnswer, questionNumber)
  }

  return (
    <ColoredBackground>
      <AnimatePresence exitBeforeEnter>
        <Container
          key={questionNumber}
          animate={{
            x: 0,
          }}
          initial={{ x: '100vw' }}
          exit={{
            x: '-100vw',
          }}
          transition={{ type: 'tween' }}
          onKeyDown={onEnter}>
          <QuestionNumber>{questionNumber + 1}</QuestionNumber>
          <QuestionText>{question.text}</QuestionText>
          <AnimateSharedLayout>
            <AnswersWrapper>
              {question.answers.map((answer, index) => (
                <AnswerButton
                  isCorrect={
                    correctAnswer === undefined
                      ? correctAnswer
                      : correctAnswer === index
                  }
                  index={index}
                  isSelected={selectedAnswer === index}
                  backgroundColor={answersColors[index]}
                  onClick={() => setSelectedAnswer(index)}
                  key={index}>
                  {answer}
                </AnswerButton>
              ))}
            </AnswersWrapper>
          </AnimateSharedLayout>
          <Button
            color={theme.colors.purple}
            isLoading={isLoading}
            disabled={selectedAnswer === -1}
            onClick={onCheck}>
            CHECK
          </Button>
        </Container>
      </AnimatePresence>
      <GlobalStyle />
      <CriticalError />
    </ColoredBackground>
  )
}

Page.propTypes = {
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isQuizDone: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.number,
  submitAnswer: PropTypes.func.isRequired,
  nextQuestionNumber: PropTypes.func.isRequired,
  startDataFetch: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default withTheme(Page)
