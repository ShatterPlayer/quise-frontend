import React, { useRef } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useAnimation, motion } from 'framer-motion'

// Styles
import Header1 from '../../styles/headers/Header1'
import Header2 from '../../styles/headers/Header2'

// Utils
import { name as appName } from '../../utils/appInfo'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => props.theme.colors.red};
`

const LinksContainer = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: center;
`

const QuizLink = styled(Link)`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 300px;
  height: 200px;
  background-color: ${props => props.theme.colors[props.bgcolor]};
  border-radius: 30px;
  margin: 20px;
  border: none;
  cursor: pointer;
`

const QuizLinkOverlay = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0;
  font-size: 24px;
  font-weight: bold;
`

const SolvingLink = styled.input`
  position: absolute;
  top: 0;
  left: -100vw;
`

function Summary({ quizId, title }) {
  const history = useHistory()
  const linkControls = useAnimation()

  const solvingLink = useRef()

  if (!quizId) {
    history.push('/')
  }

  const animateLinkOverlay = async () => {
    await linkControls.start({ opacity: 1 })

    return await linkControls.start({ opacity: 0 }, { delay: 1 })
  }

  const copySolvingLink = () => {
    solvingLink.current.focus()
    solvingLink.current.setSelectionRange(0, 99999)
    document.execCommand('copy')
    animateLinkOverlay()
  }

  return (
    <Container>
      <Helmet>
        <title>Summary | {appName}</title>
      </Helmet>
      <SolvingLink
        readOnly
        value={`${window.location.origin}/quiz/${quizId}`}
        ref={solvingLink}
      />
      <Header1>{title}</Header1>
      <LinksContainer>
        <QuizLink as="button" bgcolor="purple" onClick={copySolvingLink}>
          <Header2>Click here to copy solving link</Header2>
          <QuizLinkOverlay animate={linkControls}>Link copied</QuizLinkOverlay>
        </QuizLink>
        <QuizLink
          bgcolor="yellow"
          to={`/quiz/${quizId}/leaderboard`}
          target="_blank">
          <Header2>Click here to open leaderboard</Header2>
        </QuizLink>
      </LinksContainer>
    </Container>
  )
}

export default Summary
