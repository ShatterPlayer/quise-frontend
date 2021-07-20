import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// Redux
import { connect } from 'react-redux'
import { setNewQuizTitle, addError, clearError } from '../redux/actions'

// Components
import Page from '../components/home/Page'

// Utilities
import AppInfoContext from '../utils/AppInfoContext'
import regexes from '../utils/regexes'
const { regexId, regexQuizTitle } = regexes

function HomePage({ error, setAcceptedTitle, addError, clearError }) {
  const [overlay, setOverlay] = useState('')
  const [quizId, setQuizId] = useState('')
  const [title, setTitle] = useState('')
  const history = useHistory()
  const { name: appName } = useContext(AppInfoContext)

  const solveQuiz = e => {
    e.preventDefault()
    if (!regexId.test(quizId)) {
      addError('Invalid Quiz ID')
    } else {
      clearError()
      history.push(`/quiz/${quizId}`)
    }
  }

  const createQuiz = e => {
    e.preventDefault()
    if (regexQuizTitle.test(title.trim())) {
      clearError()
      setAcceptedTitle(title)
      history.push('/createquiz/1')
    } else {
      addError(
        'Quiz title must contain from 4 to 70 letters and be alphanumeric',
      )
    }
  }

  const closeOverlay = () => {
    setOverlay('')
    clearError()
  }

  return (
    <>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <Page
        overlay={overlay}
        setOverlay={setOverlay}
        setQuizId={setQuizId}
        setTitle={setTitle}
        solveQuiz={solveQuiz}
        createQuiz={createQuiz}
        closeOverlay={closeOverlay}
        error={error}
      />
    </>
  )
}

HomePage.propTypes = {
  error: PropTypes.string.isRequired,
  setAcceptedTitle: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  setAcceptedTitle: title => dispatch(setNewQuizTitle(title)),
  addError: error => dispatch(addError(error)),
  clearError: () => dispatch(clearError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
