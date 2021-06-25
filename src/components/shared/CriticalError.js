import React from 'react'
import styled, { withTheme } from 'styled-components'
import Header1 from '../../styles/headers/Header1'
import Header2 from '../../styles/headers/Header2'
import Button from './Button'

const Container = styled.div`
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

function CriticalError({ theme, error }) {
  return (
    <Container>
      <Header1>Ooops...</Header1>
      <Header2>Application ran into unexpected error</Header2>
      <Header2>Please, try again later</Header2>
      <StyledButton color={theme.colors.green}>Close</StyledButton>
      <ErrorMessage>
        <b>Error message:</b> Recaptcha Validation Failed{error}
      </ErrorMessage>
    </Container>
  )
}

export default withTheme(CriticalError)
