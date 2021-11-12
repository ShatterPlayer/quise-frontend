import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useAnimation,
} from 'framer-motion'
import styled, { useTheme } from 'styled-components'
import deleteQuiz from '../../redux/actions/deleteQuiz'

// Components
import ImportedButton from '../shared/Button'
import CriticalError from '../shared/CriticalError'

// Images
import listImage from '../../images/list-square-bullet.svg'
import closeImage from '../../images/wrongAnswer.svg'

// Utils
import getQuizzesFromLocalStorage from '../../utils/getQuizzesFromLocalStorage'

const Button = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 7px;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.white};
  width: 35px;
  height: 35px;
  white-space: nowrap;
  font-weight: bold;
  overflow-x: hidden;
  cursor: pointer;
  transition: width 0.4s;

  :hover,
  :focus {
    width: 130px;
  }
`

const Icon = styled(motion.img)`
  height: 45%;
  margin-right: 10px;
`

const Quizzes = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  z-index: 10;
  color: black;
`

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-image: url(${closeImage});
  background-repeat: no-repeat;
  background-size: cover;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
`

const List = styled.ul`
  list-style: none;
  padding: 20px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Quiz = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  width: 500px;
  font-weight: bold;
  background-color: ${({ darker }) =>
    darker ? 'rgb(0, 0, 0, 0.05)' : 'transparent'};

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const DeleteButton = styled(ImportedButton)`
  min-width: 85px;
  max-width: 85px;
  height: 40px;
  font-size: 13px;
  margin-left: 20px;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

function QuizList({ deleteQuiz, isFetchingData }) {
  const [visible, setVisible] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const buttonAnimation = useAnimation()
  const list = useAnimation()
  const { colors } = useTheme()

  useEffect(() => {
    refreshQuizzes()
  }, [])

  const refreshQuizzes = () => {
    const quizzes = getQuizzesFromLocalStorage()
    setQuizzes(quizzes)
  }

  const onButtonClick = () => {
    setVisible(true)
  }

  const onListClose = () => {
    setVisible(false)
  }

  const onQuizDelete = id => {
    deleteQuiz(id).then(() => refreshQuizzes())
  }

  return (
    <AnimateSharedLayout>
      <Button
        layoutId="quizzes"
        animate={buttonAnimation}
        onClick={onButtonClick}>
        <Icon src={listImage} alt="quizList" />
        Your Quizzes
      </Button>

      <AnimatePresence>
        {visible && (
          <Quizzes exit={{ opacity: 1 }} animate={list} layoutId="quizzes">
            <Close onClick={onListClose} />
            <List>
              {quizzes.map((quiz, index) => (
                <Quiz key={quiz.id} darker={index % 2 === 0}>
                  <Link target="_blank" href={`/quiz/${quiz.id}`}>
                    {quiz.title}
                  </Link>
                  <DeleteButton
                    isLoading={isFetchingData}
                    onClick={() => onQuizDelete(quiz.id)}
                    color={colors.red}>
                    Delete
                  </DeleteButton>
                </Quiz>
              ))}
              {quizzes.length === 0 && <li>You do not have quizzes :(</li>}
            </List>
            <CriticalError />
          </Quizzes>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

QuizList.propTypes = {
  deleteQuiz: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool,
}

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
})

const mapDispatchToProps = dispatch => ({
  deleteQuiz: (...params) => dispatch(deleteQuiz(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
