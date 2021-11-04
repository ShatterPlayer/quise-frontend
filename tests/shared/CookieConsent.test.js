import React from 'react'
import { cleanup, render, screen, fireEvent } from '../utils'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import CookieConsent from '../../src/components/shared/CookieConsent'

afterEach(cleanup)

describe('CookieConsent component', () => {
  test('saves current date to cookie when accepted', () => {
    const ISOTimeRegex =
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    render(<CookieConsent />)
    const acceptButton = screen.getByRole('button', { name: "It's fine" })
    userEvent.click(acceptButton)
    expect(ISOTimeRegex.test(Cookies.get('CookieConsent'))).toBeTruthy()
    Cookies.remove('CookieConsent')
  })

  test('is rendered if does not accepted', () => {
    Cookies.remove('CookieConsent')
    render(<CookieConsent />)
    const container = screen.queryByRole('article')
    expect(container).toBeInTheDocument()
  })

  test('is not rendered if accepted', () => {
    Cookies.set('CookieConsent', new Date().toISOString())
    render(<CookieConsent />)
    const container = screen.queryByRole('article')
    expect(container).not.toBeInTheDocument()
    Cookies.remove('CookieConsent')
  })
})
