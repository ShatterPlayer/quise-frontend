import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

// Images
import trashBin from '../../images/trashBin.svg'

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  z-index: 9;

  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`

const DeleteButtonImage = styled.img`
  width: 80%;
`

const DeleteQuestionButton = ({ onClick, disabled, isFetchingData }) => (
  <DeleteButton onClick={onClick} disabled={disabled || isFetchingData}>
    <DeleteButtonImage alt="trashBin" src={trashBin} />
  </DeleteButton>
)

DeleteQuestionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

export default connect(mapStateToProps)(DeleteQuestionButton)
