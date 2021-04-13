// Redux
import { connect } from 'react-redux'
import {
  nextQuestion,
  nextQuestionNumber,
  START_DATA_FETCH,
} from '../redux/actions'

// Components
import SolvePage from '../components/solve/SolvePage'

const mapStateToProps = state => {
  return {
    question: state.questions[state.currentQuestion],
    correctAnswer: state.questions[state.currentQuestion].correctAnswer,
    isQuizDone: state.isQuizDone,
    error: state.error,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage)
