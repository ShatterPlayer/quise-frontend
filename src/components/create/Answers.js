import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Styles
import AnswersWrapper from '../../styles/AnswersWrapper'
import AnswerError from './styles/AnswerError'

// Components
import Answer from './Answer'

const AnswersWrapperWithMargin = styled(AnswersWrapper)`
  margin: 20px 0;
`

const AnswerContainer = styled.div`
  position: relative;
`

export function Answers({
  theme: { answersColors },
  handleAnswerChange,
  prohibitNewline,
  isFetchingData,
  question,
  initialAnswer,
  answersErrors,
}) {
  console.log(prohibitNewline)
  return (
    <AnswersWrapperWithMargin>
      {answersColors.map((color, index) => (
        <AnswerContainer key={color}>
          <Answer
            onInput={e => handleAnswerChange(e, index)}
            onBlur={e => handleAnswerChange(e, index)}
            onKeyDown={prohibitNewline}
            editable={!isFetchingData}
            backgroundColor={color}>
            {question ? question.answers[index] : initialAnswer}
          </Answer>
          <AnswerError>{answersErrors[index]}</AnswerError>
        </AnswerContainer>
      ))}
    </AnswersWrapperWithMargin>
  )
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

Answers.propTypes = {
  theme: PropTypes.object.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
  prohibitNewline: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  question: PropTypes.object,
  initialAnswer: PropTypes.string.isRequired,
  answersErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default connect(mapStateToProps)(withTheme(Answers))
