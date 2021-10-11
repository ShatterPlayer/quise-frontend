import React, { useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import Button from './Button'
import { AnimatePresence, motion } from 'framer-motion'
import Cookies from 'js-cookie'

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
`

const MainHeader = styled.h2`
  text-align: center;
  margin: 20px 0;
`

const Cookie = styled.h2`
  font-size: 50px;
`

const Paragraph = styled.p`
  text-align: center;
  margin: 5px 0;
`

const StyledButton = styled(Button)`
  height: 50px;
  width: 150px;
  margin: 20px 0;
`

function CookieConsent() {
  const theme = useTheme()
  const [accepted, setAccepted] = useState(true)

  useEffect(() => {
    if (!Cookies.get('CookieConsent')) {
      setAccepted(false)
    }
  }, [])

  const agree = () => {
    Cookies.set('CookieConsent', new Date().toISOString())
    setAccepted(true)
  }
  return (
    <AnimatePresence>
      {!accepted && (
        <Container exit={{ opacity: 0 }}>
          <Cookie>🍪</Cookie>
          <MainHeader>This site uses cookies</MainHeader>
          <Paragraph>
            In order to create and solve quizzes, some data needs to be stored
            on your device.
          </Paragraph>
          <Paragraph>App uses this data only to distinguish users.</Paragraph>
          <Paragraph>
            None of your information is stored or shared without your knowledge.
          </Paragraph>
          <StyledButton onClick={agree} color={theme.colors.green}>
            It's fine
          </StyledButton>
        </Container>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent
