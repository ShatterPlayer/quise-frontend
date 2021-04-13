import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { useParams } from 'react-router-dom'

// Components
import Button from '../shared/Button'
import Error from '../shared/Error'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
`

const QuizDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  text-align: center;
`

const QuestionsAmount = styled.span`
  font-size: 22px;
`

const Line = styled.div`
  width: 300px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
`

const UserDetails = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UsernameInput = styled.input`
  width: 315px;
  height: 64px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  font-family: inherit;

  ::placeholder {
    color: black;
  }
`

function StartPage({
  title,
  numberOfQuestions,
  error,
  startQuiz,
  getQuizDetails,
  loading,
  theme,
}) {
  const { quizId } = useParams()
  const [username, setUsername] = useState('')

  useEffect(() => {
    getQuizDetails(quizId)
  }, [getQuizDetails, quizId])

  return (
    <Container>
      <QuizDetails>
        <Title>{title}</Title>
        <Line />
        <QuestionsAmount>{numberOfQuestions} questions</QuestionsAmount>
      </QuizDetails>
      <UserDetails onSubmit={e => e.preventDefault()}>
        <UsernameInput
          type="text"
          placeholder="USERNAME"
          disabled={loading}
          onChange={e => setUsername(e.currentTarget.value)}
        />
        <Button
          type="submit"
          isLoading={loading}
          disabled={username.trim() === ''}
          color={theme.colors.blue}
          onClick={() => startQuiz(quizId, username)}>
          START
        </Button>
        {error && <Error>{error}</Error>}
      </UserDetails>
    </Container>
  )
}

StartPage.propTypes = {
  title: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  startQuiz: PropTypes.func.isRequired,
  getQuizDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withTheme(StartPage)
