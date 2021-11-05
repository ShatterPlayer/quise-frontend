import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'

// Styles
import StyledButton from '../../styles/StyledButton'

// Components
import Loader from './Loader'

function Button(props) {
  const { disabled, isLoading, children } = props
  return (
    <StyledButton {...props} disabled={disabled || isLoading}>
      {children}
      <AnimatePresence>{isLoading && <Loader small />}</AnimatePresence>
    </StyledButton>
  )
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
