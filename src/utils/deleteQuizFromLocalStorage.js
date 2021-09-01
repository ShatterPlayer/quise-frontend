import getQuizzesFromLocalStorage from './getQuizzesFromLocalStorage'

export default id => {
  try {
    const quizzes = getQuizzesFromLocalStorage()
    const filteredQuizzes = quizzes.filter(quiz => quiz.id !== id)
    localStorage.setItem('YourQuizzes', JSON.stringify(filteredQuizzes))
  } catch {
    console.error('Quiz list can not be updated (localStorage error)')
  }
}
