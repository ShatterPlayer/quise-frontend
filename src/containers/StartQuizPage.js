// Redux
import { connect } from 'react-redux'
import { startQuiz, getQuizDetails } from '../redux/actions'

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
    startQuiz: (quizId, username) => dispatch(startQuiz(quizId, username)),
    getQuizDetails: quizId => dispatch(getQuizDetails(quizId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
