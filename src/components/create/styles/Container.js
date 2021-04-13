import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
`

export default Container
