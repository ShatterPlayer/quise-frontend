import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const DotsContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
`

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid white;
  margin: 5px;
  background: ${props => (props.selected ? 'white' : 'none')};
  cursor: pointer;

  :disabled {
    cursor: initial;
  }
`

const Dots = ({
  maxCorrectQuestionNumber,
  isFetchingData,
  handleQuestionChange,
  match,
}) => {
  const { questionNumber } = match.params
  const getDots = () => {
    const dots = []
    for (
      let i = 0;
      i < Math.max(maxCorrectQuestionNumber - 1, questionNumber);
      i++
    ) {
      dots.push(
        <Dot
          key={i}
          selected={i === questionNumber - 1}
          disabled={i === questionNumber - 1 || isFetchingData}
          onClick={() => handleQuestionChange(i + 1)}
        />,
      )
    }
    return dots
  }
  return <DotsContainer>{getDots()}</DotsContainer>
}

const mapStateToProps = state => ({
  maxCorrectQuestionNumber: state.newQuiz.questions.length + 1,
  isFetchingData: state.isFetchingData,
})

Dots.propTypes = {
  maxCorrectQuestionNumber: PropTypes.number.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withRouter(Dots))
