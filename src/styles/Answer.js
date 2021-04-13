import styled from 'styled-components'

const Answer = styled.button`
  position: relative;
  width: 300px;
  min-height: 37px;
  padding: 10px;
  color: white;
  border: none;
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  margin: 15px 40px;
  background-color: ${props => props.color};
  outline: none;
  transition: 0.4s;
`

export default Answer
