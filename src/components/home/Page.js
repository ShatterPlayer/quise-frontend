import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

// Components
import Button from '../shared/Button'
import Input from './Input'
import QuizList from './QuizList'

// Styles
import Header1 from '../../styles/headers/Header1'
import Header2 from '../../styles/headers/Header2'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.orange};
  color: ${props => props.theme.colors.white};
`

const StyledButton = styled(Button)`
  margin-top: 180px;
  margin-bottom: 40px;
`

const Overlay = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
`

const OverlayText = styled.span`
  font-size: 13px;
  font-weight: 700;
  margin-top: 5px;
`
const OverlayBackButton = styled(Button)`
  width: 150px;
  height: 50px;
  position: absolute;
  top: 20px;
  right: 20px;
`
function Page({
  theme,
  overlay,
  setOverlay,
  closeOverlay,
  setQuizId,
  setTitle,
  error,
  solveQuiz,
  createQuiz,
}) {
  return (
    <Container>
      <QuizList />
      <Header1>Quise</Header1>
      <Header2>Quiz App</Header2>
      <StyledButton
        color={theme.colors.green}
        onClick={() => setOverlay('createQuiz')}>
        Create Quiz
      </StyledButton>
      <Button color={theme.colors.blue} onClick={() => setOverlay('solveQuiz')}>
        Solve Quiz
      </Button>
      {overlay === 'createQuiz' && (
        <Overlay onSubmit={createQuiz}>
          <Input
            initialFocus
            error={error}
            onChange={e => setTitle(e.currentTarget.value)}
            placeholder="Title of the quiz"
          />
          <OverlayText>Type in the title and press enter</OverlayText>
          <OverlayBackButton
            type="button"
            color={theme.colors.green}
            onClick={closeOverlay}>
            Go back
          </OverlayBackButton>
        </Overlay>
      )}
      {overlay === 'solveQuiz' && (
        <Overlay onSubmit={solveQuiz}>
          <Input
            initialFocus
            placeholder="Quiz ID"
            error={error}
            onChange={e => setQuizId(e.currentTarget.value)}
          />
          <OverlayText>Type in the quiz id and press enter</OverlayText>
          <OverlayBackButton
            type="button"
            color={theme.colors.blue}
            onClick={closeOverlay}>
            Go back
          </OverlayBackButton>
        </Overlay>
      )}
    </Container>
  )
}

Page.propTypes = {
  overlay: PropTypes.string.isRequired,
  setOverlay: PropTypes.func.isRequired,
  closeOverlay: PropTypes.func.isRequired,
  setQuizId: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  solveQuiz: PropTypes.func.isRequired,
  createQuiz: PropTypes.func.isRequired,
}

export default withTheme(Page)
