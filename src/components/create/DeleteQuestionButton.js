import React from 'react'
import styled from 'styled-components'

// Images
import trashBin from '../../images/trashBin.svg'

const DeleteButton = styled.button`
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

const DeleteQuestionButton = ({ onClick, disabled }) => (
  <DeleteButton onClick={onClick} disabled={disabled}>
    <DeleteButtonImage alt="trashBin" src={trashBin} />
  </DeleteButton>
)
export default DeleteQuestionButton
