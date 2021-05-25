import styled from 'styled-components'

const AnswerError = styled.span`
  position: absolute;
  left: 50%;
  bottom: 0;
  font-size: 11px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.colors.red};
  transform: translate(-50%, 50%);
`

export default AnswerError
