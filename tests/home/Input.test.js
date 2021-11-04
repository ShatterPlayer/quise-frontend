import React from 'react'
import { render, screen, cleanup } from '../utils'
import userEvent from '@testing-library/user-event'

import Input from '../../src/components/home/Input'

afterEach(cleanup)

describe('Input component', () => {
  test('gains focus on render if specified', () => {
    render(
      <Input
        placeholder="Type here"
        onChange={() => true}
        initialFocus={true}
      />,
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })

  test('does not gain focus on render if not specified', () => {
    render(<Input placeholder="Type here" onChange={() => true} />)
    const input = screen.getByRole('textbox')
    expect(input).not.toHaveFocus()
  })

  test('calls function on input', () => {
    const mockFn = jest.fn()

    render(<Input placeholder="Type here" onChange={mockFn} />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Hello')
    expect(mockFn).toHaveBeenCalled()
  })

  test('shows error if is passed', () => {
    render(<Input placeholder="Type here" error="This is an error" />)
    const error = screen.getByText('This is an error')
    expect(error).toBeInTheDocument()
  })
})
