import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'

// Components
import Loader from './Loader'

const StyledButton = styled.button`
  position: relative;
  width: 205px;
  height: 64px;
  background-color: ${props => props.color};
  border-radius: 50px;
  border: none;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  cursor: pointer;
`

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
