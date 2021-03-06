import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

// Images
import correctAnswerImage from '../../images/correctAnswer.svg'

const CorrectAnswerElement = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  :disabled {
    cursor: default;
  }
`

const CorrectAnswerMark = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: url(${correctAnswerImage});
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
`

const CorrectAnswer = ({
  color,
  setCorrectAnswer,
  index,
  isFetchingData,
  correctAnswer,
}) => {
  const selectAnimation = useAnimation()

  useEffect(() => {
    if (correctAnswer === index) {
      selectAnimation.start('visible')
    } else {
      selectAnimation.start('hidden')
    }
  }, [correctAnswer, index, selectAnimation])

  const onClick = () => {
    setCorrectAnswer(index)
    selectAnimation.start('visible')
  }
  return (
    <CorrectAnswerElement
      disabled={isFetchingData || correctAnswer === index}
      backgroundColor={color}
      onClick={onClick}>
      <CorrectAnswerMark
        variants={{
          hidden: {
            opacity: 0,
            width: '0%',
            height: '0%',
          },
          visible: {
            opacity: 1,
            width: '100%',
            height: '100%',
          },
        }}
        transition={{ type: 'tween' }}
        initial={correctAnswer === index ? 'visible' : 'hidden'}
        animate={selectAnimation}
      />
    </CorrectAnswerElement>
  )
}

CorrectAnswer.propTypes = {
  color: PropTypes.string.isRequired,
  setCorrectAnswer: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

export default connect(mapStateToProps)(CorrectAnswer)
