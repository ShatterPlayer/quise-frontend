// Redux
import { connect } from 'react-redux'
import getLeaderboard from '../redux/actions/getLeaderboard'

// Components
import Leaderboard from '../components/leaderboard/Page'

const mapStateToProps = state => {
  return {
    users: state.leaderboardUsers,
    title: state.title,
    loading: state.isFetchingData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: quizId => dispatch(getLeaderboard(quizId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
