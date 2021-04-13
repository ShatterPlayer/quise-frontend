import { connect } from 'react-redux'
import NewQuizSummary from '../components/create/Summary'

const mapStateToProps = state => ({
  quizId: state.newQuiz.id,
  title: state.newQuiz.title,
})

export default connect(mapStateToProps)(NewQuizSummary)
