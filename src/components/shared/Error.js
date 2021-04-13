import styled from 'styled-components'

const Error = styled.span`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
  filter: brightness(1.5);
  font-weight: 900;
  height: 80px;
  font-size: 16px;
  padding: 16px 0;
`

export default Error
