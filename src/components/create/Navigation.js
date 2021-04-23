import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import Loader from '../shared/Loader'

const NavigationContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
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
  onClickPrevious,
  disabledFinish,
  onClickFinish,
  disabledNext,
  onClickNext,
}) {
  return (
    <NavigationContainer>
      {isFetchingData && <Loader small />}
      <NavButton
        disabled={disabledPrevious || isFetchingData}
        onClick={onClickPrevious}>
        Previous
      </NavButton>
      <NavButton
        disabled={disabledFinish || isFetchingData}
        onClick={onClickFinish}
        finish>
        Finish
      </NavButton>
      <NavButton
        disabled={disabledNext || isFetchingData}
        onClick={onClickNext}>
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
  onClickPrevious: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

export default connect(mapStateToProps)(Navigation)
