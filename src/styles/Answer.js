import styled from 'styled-components'

const Answer = styled.button`
  display: block;
  position: relative;
  width: 300px;
  min-height: 37px;
  padding: 10px;
  color: white;
  border: none;
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  margin: 15px 0;
  background-color: ${props => props.color};
  transition: 0.4s;

  @media only screen and (min-width: 750px) {
    width: 30vw;
    padding: 30px 20px;
    font-size: 15px;
    margin: 15px;
  }
`

export default Answer
