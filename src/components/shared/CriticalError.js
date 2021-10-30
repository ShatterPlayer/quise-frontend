import React from 'react'
import styled, { withTheme } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header1 from '../../styles/headers/Header1'
import Header2 from '../../styles/headers/Header2'
import Button from './Button'
import clearError from '../../redux/actions/clearError'

const Container = styled(motion.article)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: ${props => props.theme.colors.red};
  color: white;
`

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
  font-size: 18px;
  margin-top: 30px;
`

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  justify-self: flex-end;
  text-align: center;
`

function CriticalError({ theme, error, clearError }) {
  return (
    <AnimatePresence>
      {error !== '' && (
        <Container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <Header1>Ooops...</Header1>
          <Header2>Application ran into unexpected error</Header2>
          <Header2>Please, try again later</Header2>
          <StyledButton color={theme.colors.green} onClick={clearError}>
            Close
          </StyledButton>
          <ErrorMessage>
            <b>Error message:</b> {error}
          </ErrorMessage>
        </Container>
      )}
    </AnimatePresence>
  )
}

CriticalError.propTypes = {
  theme: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearError()),
})

const CriticalErrorTheme = withTheme(CriticalError)

export { CriticalErrorTheme as CriticalError }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(CriticalError))
