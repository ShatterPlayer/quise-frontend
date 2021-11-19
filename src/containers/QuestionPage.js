// Redux
import { connect } from 'react-redux'
import nextQuestion from '../redux/actions/nextQuestion'
import nextQuestionNumber from '../redux/actions/nextQuestionNumber'
import clearSolvedQuiz from '../redux/actions/clearSolvedQuiz'
import { START_DATA_FETCH } from '../redux/actions/constants'

// Components
import SolvePage from '../components/solve/SolvePage'

const mapStateToProps = state => {
  return {
    question: state.questions[state.currentQuestion],
    correctAnswer: state.questions[state.currentQuestion].correctAnswer,
    isQuizDone: state.isQuizDone,
    isLoading: state.isFetchingData,
    questionNumber: state.currentQuestion,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitAnswer: (answer, questionNumber) =>
      dispatch(nextQuestion(answer, questionNumber)),
    nextQuestionNumber: () => dispatch(nextQuestionNumber()),
    startDataFetch: () => dispatch({ type: START_DATA_FETCH }),
    clearSolvedQuiz: () => dispatch(clearSolvedQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage)
