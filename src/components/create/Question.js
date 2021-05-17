import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuestionText from '../../styles/QuestionText'
import AnswerError from './styles/AnswerError'

// Utils
import prohibitNewline from '../../utils/prohibitNewline'

const QuestionTextWrapper = styled.div`
  position: relative;
`
const QuestionError = styled(AnswerError)`
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
`

export const Question = ({
  isFetchingData,
  handleQuestionTextChange,
  questionError,
  children,
  initialQuestionText,
}) => (
  <QuestionTextWrapper>
    <QuestionText
      contentEditable={!isFetchingData}
      suppressContentEditableWarning
      onInput={handleQuestionTextChange}
      onBlur={handleQuestionTextChange}
      onKeyDown={prohibitNewline}
      // onFocus={e => {
      //   if (e.currentTarget.innerText == initialQuestionText) {
      //     setTimeout(() => {
      //       document.execCommand('selectAll', false, null)
      //     }, 1)
      //   }
      // }}
    >
      {children ? children : initialQuestionText}
    </QuestionText>
    <QuestionError>{questionError}</QuestionError>
  </QuestionTextWrapper>
)

const mapStateToProps = (state, ownProps) => ({
  isFetchingData: state.isFetchingData,
})

Question.propTypes = {
  children: PropTypes.string,
  isFetchingData: PropTypes.bool.isRequired,
  handleQuestionTextChange: PropTypes.func.isRequired,
  questionError: PropTypes.string.isRequired,
  initialQuestionText: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Question)
