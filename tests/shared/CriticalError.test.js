import React from 'react'
import { render, screen, waitFor } from '../utils'
import CriticalError from '../../src/components/shared/CriticalError'

// Redux
import store from '../../src/redux'
import clearError from '../../src/redux/actions/clearError'
import addError from '../../src/redux/actions/addError'

describe('CriticalError component', () => {
  test('is not visible when there is no error', async () => {
    await store.dispatch(clearError())
    render(<CriticalError />)
    const container = screen.queryByRole('article')
    expect(container).not.toBeInTheDocument()
  })

  test('is shown when error occurs', async () => {
    await store.dispatch(addError('Error'))
    render(<CriticalError />)
    const container = screen.queryByRole('article')
    expect(container).toBeInTheDocument()
  })
})
