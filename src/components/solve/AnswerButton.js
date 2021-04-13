import React from 'react'
import { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

// Styles
import Answer from '../../styles/Answer'
import AnswerSelection from '../../styles/AnswerSelection'

function AnswerButton({
  isCorrect,
  isSelected,
  backgroundColor,
  theme,
  onClick,
  children,
  key,
  editable,
}) {
  const { green, red } = theme.colors

  const variants = {
    animation: {
      borderColor: backgroundColor,
      opacity: 1,
    },
    initial: {
      opacity: 0,
    },
  }

  return (
    <Answer
      color={
        isCorrect === undefined ? backgroundColor : isCorrect ? green : red
      }
      onClick={onClick}
      key={key}
      type="button">
      {isSelected && (
        <AnswerSelection
          animate="animation"
          initial="initial"
          variants={variants}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          layoutId="selection"
        />
      )}
      {children}
    </Answer>
  )
}

AnswerButton.propTypes = {
  isCorrect: PropTypes.bool,
  isSelected: PropTypes.bool,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  key: PropTypes.any,
}

export default withTheme(AnswerButton)
