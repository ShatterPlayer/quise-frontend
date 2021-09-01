export default () => {
  const quizzesLocalStorage = localStorage.getItem('YourQuizzes')

  if (quizzesLocalStorage) {
    return JSON.parse(quizzesLocalStorage)
  } else {
    return []
  }
}
