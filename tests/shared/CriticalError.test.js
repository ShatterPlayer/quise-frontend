import React from 'react'
import { render, screen } from '../utils'

import { CriticalError } from '../../src/components/shared/CriticalError'

describe('CriticalError component', () => {
  test('is not visible when there is no error', () => {
    render(<CriticalError error="" clearError={() => true} />)
    const container = screen.queryByRole('article')
    expect(container).toBeNull()
  })

  test('is shown when error occurs', () => {
    render(<CriticalError error="Error :(" clearError={() => true} />)
    const container = screen.queryByRole('article')
    expect(container).not.toBeNull()
  })
})
