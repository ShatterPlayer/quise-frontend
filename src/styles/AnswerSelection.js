import styled from 'styled-components'
import { motion } from 'framer-motion'

const AnswerSelection = styled(motion.div)`
  position: absolute;
  box-sizing: content-box;
  top: -15px;
  left: -15px;
  border: 5px solid transparent;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
`

export default AnswerSelection
