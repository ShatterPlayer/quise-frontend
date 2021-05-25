import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import Loader from '../shared/Loader'

const NavigationContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 10vh;
  display: flex;

  @media only screen and (min-width: 750px) {
    height: 15vh;
  }
`

const NavButton = styled.button`
  flex: 1;
  background-color: ${props =>
    props.finish ? props.theme.colors.green : props.theme.colors.blue};
  border: none;
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  cursor: pointer;

  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`

export function Navigation({
  isFetchingData,
  disabledPrevious,
  changeQuestion,
  disabledFinish,
  finishQuiz,
  disabledNext,
}) {
  const params = useParams()
  const questionNumber = Number(params.questionNumber)
  return (
    <NavigationContainer>
      {isFetchingData && <Loader small />}
      <NavButton
        disabled={disabledPrevious || isFetchingData}
        onClick={() => changeQuestion(questionNumber - 1)}>
        Previous
      </NavButton>
      <NavButton
        disabled={disabledFinish || isFetchingData}
        onClick={finishQuiz}
        finish>
        Finish
      </NavButton>
      <NavButton
        disabled={disabledNext || isFetchingData}
        onClick={() => changeQuestion(questionNumber + 1)}>
        Next
      </NavButton>
    </NavigationContainer>
  )
}

Navigation.propTypes = {
  isFetchingData: PropTypes.bool.isRequired,
  disabledPrevious: PropTypes.bool.isRequired,
  disabledFinish: PropTypes.bool.isRequired,
  disabledNext: PropTypes.bool.isRequired,
  finishQuiz: PropTypes.func.isRequired,
  changeQuestion: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

export default connect(mapStateToProps)(Navigation)
