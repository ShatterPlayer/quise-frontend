// Redux
import { connect } from 'react-redux'
import { startQuiz, getQuizDetails, addError } from '../redux/actions'

// Components
import StartPage from '../components/solve/StartPage'

const mapStateToProps = state => {
  return {
    title: state.title,
    numberOfQuestions: state.numberOfQuestions,
    error: state.error,
    loading: state.isFetchingData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startQuiz: (...params) => dispatch(startQuiz(...params)),
    getQuizDetails: quizId => dispatch(getQuizDetails(quizId)),
    addError: error => dispatch(addError(error)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
