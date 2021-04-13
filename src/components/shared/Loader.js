import React, { useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import PropTypes from 'prop-types'

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  z-index: 99;
`

const Block = styled(motion.div)`
  width: ${props => (props.small ? '30px' : '25vw')};
  height: ${props => (props.small ? '30px' : '25vw')};
  background-color: red;
`

function Loader({ theme, small }) {
  const colors = Object.values(theme.colors)
  const [colorIndex, setColorIndex] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    controls
      .start({
        borderRadius: ['5%', '50%', '5%'],
        rotate: [10, -180, -370],
        backgroundColor: colors[colorIndex],
      })
      .then(() => {
        return controls.start({
          borderRadius: ['5%', '50%', '5%'],
          rotate: [-370, -180, 10],
          backgroundColor: colors[(colorIndex + 1) % colors.length],
        })
      })
      .then(() => {
        setColorIndex((colorIndex + 2) % colors.length)
      })
  }, [colorIndex, colors, controls])

  return (
    <Wrapper
      key="loader"
      initial={small ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Block
        small={small}
        animate={controls}
        transition={{
          ease: 'easeInOut',
          duration: 2,
        }}
      />
    </Wrapper>
  )
}

Loader.propTypes = {
  small: PropTypes.bool,
}

export default withTheme(Loader)
