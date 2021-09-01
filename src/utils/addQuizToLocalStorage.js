import getQuizzesFromLocalStorage from './getQuizzesFromLocalStorage'

export default quiz => {
  try {
    const quizzes = getQuizzesFromLocalStorage()

    quizzes.push(quiz)

    localStorage.setItem('YourQuizzes', JSON.stringify(quizzes))
  } catch {
    console.error('Quiz can not be saved to localStorage')
  }
}
