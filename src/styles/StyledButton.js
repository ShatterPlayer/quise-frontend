import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  width: 205px;
  height: 64px;
  background-color: ${props => props.color};
  border-radius: 50px;
  border: none;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  cursor: pointer;

  // Styles below make it possible to use the button as a link
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default StyledButton
