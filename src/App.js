import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './containers/HomePage'
import QuizPage from './containers/QuizPage'
import LeaderboardPage from './containers/LeaderboardPage'
import CreateQuizPage from './containers/CreateQuizPage'
import NewQuizSummaryPage from './containers/NewQuizSummaryPage'
import PageNotFound from './components/404/PageNotFound'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/quiz/:quizId" component={QuizPage} exact />
        <Route
          path="/quiz/:quizId/leaderboard"
          component={LeaderboardPage}
          exact
        />
        <Route
          path="/createquiz/:questionNumber"
          children={({ match }) => <CreateQuizPage match={match} exact />}
        />
        <Route path="/quizsummary" component={NewQuizSummaryPage} exact />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
