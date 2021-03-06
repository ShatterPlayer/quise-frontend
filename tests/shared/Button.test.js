import React from 'react'
import { render, screen, cleanup } from '../utils'
import userEvent from '@testing-library/user-event'

import Button from '../../src/components/shared/Button'

afterEach(cleanup)

describe('Button component', () => {
  test('calls a function on click', () => {
    const fn = jest.fn()
    render(<Button color="#121212" onClick={fn} />)
    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(fn).toBeCalled()
  })

  test('is disabled when data is loading', () => {
    render(<Button color="#121212" isLoading={true} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
