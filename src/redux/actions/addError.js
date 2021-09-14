import { ADD_ERROR } from './constants'

export default message => ({
  type: ADD_ERROR,
  error: message,
})
