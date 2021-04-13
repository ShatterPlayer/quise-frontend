import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Container = styled.div`
  position: relative;
`

const StyledInput = styled.input`
  width: 250px;
  height: 40px;
  border: ${props =>
    props.error ? `2px solid ${props.theme.colors.red}` : 'none'};
  border-radius: 20px;
  text-align: center;
`

const Error = styled(motion.span)`
  position: absolute;
  width: 100%;
  color: ${props => props.theme.colors.red};
  font-weight: 700;
  text-align: center;
  top: 0;
  left: 0;
  font-size: 12px;
  padding: 4px 0;
  transition: border 0.4s;
`
function Input({ placeholder, error, onChange, initialFocus }) {
  const inputRef = useRef()

  useEffect(() => {
    if (initialFocus) {
      inputRef.current.focus()
    }
  }, [initialFocus])

  return (
    <Container>
      <Error
        animate={{ translateY: '-100%', opacity: 1 }}
        initial={{ translateY: '0%', opacity: 0 }}
      >
        {error}
      </Error>
      <StyledInput
        ref={inputRef}
        onChange={onChange}
        error={!!error}
        placeholder={placeholder}
      />
    </Container>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  initialFocus: PropTypes.bool,
}

export default Input
