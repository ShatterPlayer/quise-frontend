import { useEffect } from 'react'

const useUnloadAlert = () => {
  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])
}

export default useUnloadAlert
