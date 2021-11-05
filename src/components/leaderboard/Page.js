import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle, withTheme } from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'

// Images
import correctAnswer from '../../images/correctAnswer.svg'
import wrongAnswer from '../../images/wrongAnswer.svg'

// Components
import Loader from '../shared/Loader'

// Utils
import { name as appName } from '../../utils/appInfo'

// Styles
import TopRightButton from '../../styles/TopRightButton'

// Resetting overflow. Overflow was changed to hidden in question page.
const GlobalStyle = createGlobalStyle`
  body {
    overflow: initial;
  }
`

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.yellow};
  padding: 25px;
  color: ${props => props.theme.colors.white};
`

const Header = styled.h2`
  font-size: 30px;
`

const QuizTitle = styled.h3`
  font-size: 20px;
`
const Users = styled.ul`
  list-style: none;
  margin-top: 30px;
`

const User = styled.li`
  margin-top: 25px;
`

const Username = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const Answers = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 5px; ;
`

const AnswerWrapper = styled.li`
  margin-right: 5px;
  :last-child {
    margin-right: 0;
  }
`

const Answer = styled.img`
  width: 25px;
  height: 25px;
`
function Leaderboard({ getLeaderboard, users, title, loading, theme }) {
  const { quizId } = useParams()

  useEffect(() => {
    getLeaderboard(quizId)
  }, [getLeaderboard, quizId])

  return (
    <Container>
      <Helmet>
        <title>Leaderboard | {appName}</title>
      </Helmet>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header>Leaderboard</Header>
      <QuizTitle>{title}</QuizTitle>
      <Users>
        {users.map(user => (
          <User key={user.username}>
            <Username>{user.username}</Username>
            <Answers>
              {user.answers.length ? (
                user.answers.map((answer, index) => (
                  <AnswerWrapper key={index}>
                    <Answer
                      src={answer ? correctAnswer : wrongAnswer}
                      alt={answer ? 'correct' : 'wrong'}
                    />
                  </AnswerWrapper>
                ))
              ) : (
                <AnswerWrapper>No Answers</AnswerWrapper>
              )}
            </Answers>
          </User>
        ))}
      </Users>
      <TopRightButton
        color={theme.colors.green}
        as={Link}
        to={`/quiz/${quizId}`}>
        Solve
      </TopRightButton>
      <GlobalStyle />
    </Container>
  )
}

Leaderboard.propTypes = {
  getLeaderboard: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Leaderboard)
