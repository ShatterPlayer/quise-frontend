import React from 'react'
import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import QuestionPage from './QuestionPage'
import StartQuizPage from './StartQuizPage'

function QuizPage({ isThereAnyQuestion, questionNumber }) {
  return (
    <AnimatePresence exitBeforeEnter>
      {isThereAnyQuestion ? <QuestionPage /> : <StartQuizPage />}
    </AnimatePresence>
  )
}

const mapStateToProps = state => {
  return {
    isThereAnyQuestion: !!state.questions[0],
  }
}

QuizPage.propTypes = {
  isThereAnyQuestion: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(QuizPage)
