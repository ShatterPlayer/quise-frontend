import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const useCreationListener = id => {
  const history = useHistory()
  useEffect(() => {
    if (id !== '') {
      history.push('/quizsummary')
    }
  }, [id, history])
}

export default useCreationListener
