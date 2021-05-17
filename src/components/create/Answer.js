import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

// Styles
import AnswerContainer from '../../styles/Answer'
import AnswerText from '../../styles/AnswerText'

// Utils
import selectAllOnFocus from '../../utils/selectAllOnFocus'

function Answer({
  backgroundColor,
  onInput,
  onBlur,
  onKeyDown,
  children,
  key,
  editable,
  initialAnswer,
}) {
  return (
    <AnswerContainer as="div" color={backgroundColor} key={key}>
      <AnswerText
        contentEditable={editable}
        suppressContentEditableWarning
        onInput={onInput}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onFocus={e => {
          if (e.currentTarget.innerText === initialAnswer) {
            selectAllOnFocus()
          }
        }}>
        {children}
      </AnswerText>
    </AnswerContainer>
  )
}

Answer.defaultProps = {
  editable: true,
}

Answer.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  onInput: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  key: PropTypes.any,
  editable: PropTypes.bool,
}

export default withTheme(Answer)
