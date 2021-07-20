import store from '../redux/'
import { addError, CLEAR_ERROR } from '../redux/actions'
const runReCAPTCHA = async recaptchaRef => {
  try {
    store.dispatch({ type: CLEAR_ERROR })
    const token = await recaptchaRef.current.executeAsync()
    recaptchaRef.current.reset()
    return token
  } catch {
    store.dispatch(addError('ReCAPTCHA validation failed. Try again later.'))
    return Promise.reject()
  }
}

export default runReCAPTCHA
