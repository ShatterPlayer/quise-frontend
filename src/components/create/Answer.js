import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

// Styles
import AnswerButton from '../../styles/Answer'

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
    <AnswerButton
      as="span"
      key={key}
      color={backgroundColor}
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
    </AnswerButton>
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
