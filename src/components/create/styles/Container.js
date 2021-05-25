import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};

  @media only screen and (min-width: 750px) {
    height: 85vh;
  }
`

export default Container
