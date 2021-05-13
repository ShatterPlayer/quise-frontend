import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './containers/HomePage'
import QuizPage from './containers/QuizPage'
import VisibleLeaderboardPage from './containers/LeaderboardPage'
import CreateQuizPage from './containers/CreateQuizPage'
import NewQuizSummaryPage from './containers/NewQuizSummaryPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/quiz/:quizId" component={QuizPage} exact />
        <Route
          path="/quiz/:quizId/leaderboard"
          component={VisibleLeaderboardPage}
        />
        <Route
          path="/createquiz/:questionNumber?"
          children={({ match }) => <CreateQuizPage match={match} />}
        />
        <Route path="/quizsummary" component={NewQuizSummaryPage} exact />
      </Switch>
    </Router>
  )
}

export default App
