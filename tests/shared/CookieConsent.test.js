import React from 'react'
import { cleanup, render, screen, fireEvent } from '../utils'
import Cookies from 'js-cookie'
import CookieConsent from '../../src/components/shared/CookieConsent'

afterEach(() => cleanup())

describe('CookieConsent component', () => {
  test('saves current date to cookie when accepted', () => {
    const ISOTimeRegex =
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    render(<CookieConsent />)
    const acceptButton = screen.getByText("It's fine")
    fireEvent.click(acceptButton)
    expect(ISOTimeRegex.test(Cookies.get('CookieConsent'))).toBeTruthy()
    Cookies.remove('CookieConsent')
  })

  test('is not rendered if accepted', async () => {
    render(<CookieConsent />)
    const acceptButton = screen.getByText("It's fine")
    fireEvent.click(acceptButton)
    const container = screen.queryByTestId('container')
    expect(container).not.toBeInTheDocument()
  })
})
