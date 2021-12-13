import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { Helmet } from 'react-helmet'

// Components
import Button from '../shared/Button'
import Error from '../shared/Error'
import CookieConsent from '../shared/CookieConsent'

// Utilities
import runReCAPTCHA from '../../utils/runReCAPTCHA'
import regexes from '../../utils/regexes'
import { name as appName } from '../../utils/appInfo'

// Styles
import LeaderboardButton from '../../styles/TopRightButton'

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
  addError,
  startQuiz,
  getQuizDetails,
  loading,
  theme,
  quizDoesNotExist,
}) {
  const { quizId } = useParams()
  const [username, setUsername] = useState('')
  const recaptcha = useRef()

  useEffect(() => {
    getQuizDetails(quizId)
  }, [getQuizDetails, quizId])

  const onSubmit = e => {
    e.preventDefault()
    const { regexUsername } = regexes

    if (regexUsername.test(username.trim())) {
      runReCAPTCHA(recaptcha)
        .then(token => startQuiz(quizId, username, token))
        .catch(() => true)
    } else {
      addError(
        'Username should be from 3 to 20 characters long. Some characters may be unsupported.',
      )
    }
  }

  return (
    <>
      <Container>
        <Helmet>
          <title>Solve | {appName}</title>
        </Helmet>
        <QuizDetails>
          <Title>{title}</Title>
          <Line />
          <QuestionsAmount>{numberOfQuestions} questions</QuestionsAmount>
        </QuizDetails>
        <UserDetails onSubmit={onSubmit}>
          <ReCAPTCHA
            size="invisible"
            sitekey="6LcDvfsaAAAAACXmFp5FoIQhSGIYnkg1M6bfVXQI"
            ref={recaptcha}
          />
          <UsernameInput
            type="text"
            placeholder="USERNAME"
            disabled={loading || quizDoesNotExist}
            onChange={e => setUsername(e.currentTarget.value)}
          />
          <Button
            type="submit"
            isLoading={loading}
            disabled={username.trim() === '' || quizDoesNotExist}
            color={theme.colors.blue}>
            START
          </Button>
          <LeaderboardButton
            as={Link}
            to={`/quiz/${quizId}/leaderboard`}
            disabled={quizDoesNotExist || loading}
            color={theme.colors.yellow}>
            Leaderboard
          </LeaderboardButton>
          {error && <Error>{error}</Error>}
        </UserDetails>
      </Container>
      <CookieConsent />
    </>
  )
}

StartPage.propTypes = {
  title: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  addError: PropTypes.func.isRequired,
  startQuiz: PropTypes.func.isRequired,
  getQuizDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  quizDoesNotExist: PropTypes.bool.isRequired,
}

export default withTheme(StartPage)
