import styled from 'styled-components'

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 750px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    justify-content: center;
  }
`
export default AnswersContainer
