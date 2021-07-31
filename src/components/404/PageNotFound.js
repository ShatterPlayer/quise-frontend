import React from 'react'
import styled from 'styled-components'
import notFoundImage from '../../images/undraw_not_found_60pq.svg'
import { Helmet } from 'react-helmet'

// Utilities
import { name as appName } from '../../utils/appInfo'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.colors.purple};
  color: ${props => props.theme.colors.white};
`

const Img = styled.img`
  width: 50%;

  @media only screen and (max-width: 625px) {
    width: 80%;
  }
`

function PageNotFound() {
  return (
    <Container>
      <Helmet>
        <title>Page not found | {appName}</title>
      </Helmet>
      <Img src={notFoundImage} alt="not-found" />
      <h1>Page not found</h1>
    </Container>
  )
}

export default PageNotFound
