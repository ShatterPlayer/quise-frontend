// Redux
import { connect } from 'react-redux'
import startQuiz from '../redux/actions/startQuiz'
import getQuizDetails from '../redux/actions/getQuizDetails'
import addError from '../redux/actions/addError'

// Components
import StartPage from '../components/solve/StartPage'

const mapStateToProps = state => {
  return {
    title: state.title,
    numberOfQuestions: state.numberOfQuestions,
    error: state.error,
    loading: state.isFetchingData,
    quizDoesNotExist: state.quizDoesNotExist,
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
