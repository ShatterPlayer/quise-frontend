import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

// Components
import CorrectAnswer from './CorrectAnswer'

const CorrectAnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
`

const CorrectAnswersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

function CorrectAnswers({
  setCorrectAnswer,
  correctAnswer,
  theme: { answersColors },
}) {
  return (
    <CorrectAnswersContainer>
      Correct answer
      <CorrectAnswersWrapper>
        {answersColors.map((color, index) => (
          <CorrectAnswer
            key={color}
            color={color}
            setCorrectAnswer={setCorrectAnswer}
            index={index}
            correctAnswer={correctAnswer}
          />
        ))}
      </CorrectAnswersWrapper>
    </CorrectAnswersContainer>
  )
}

CorrectAnswers.propTypes = {
  setCorrectAnswer: PropTypes.func.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(CorrectAnswers)
