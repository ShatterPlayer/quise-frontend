import styled from 'styled-components'
import StyledButton from './StyledButton'

// Button used to navigate to connected page e.g. from solving page to leaderboard page
const TopRightButton = styled(StyledButton)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  width: 150px;
  height: 50px;
`
export default TopRightButton
