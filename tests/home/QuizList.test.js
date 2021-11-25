import React from 'react'
import { render, screen, cleanup, within } from '../utils'
import userEvent from '@testing-library/user-event'
import QuizList from '../../src/components/home/QuizList'
import addQuizToLocalStorage from '../../src/utils/addQuizToLocalStorage'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('QuizList component', () => {
  test('shows list of created quizzes', () => {
    addQuizToLocalStorage({ title: 'Quiz 1', id: 1 })
    addQuizToLocalStorage({ title: 'Quiz 2', id: 2 })
    render(<QuizList />)
    const button = screen.getByRole('button', {
      name: /Quizzes/,
    })
    userEvent.click(button)
    const list = screen.getByRole('list')
    expect(list.children.length).toBe(2)
  })

  test('shows message if there are no quizzes', () => {
    render(<QuizList />)
    const button = screen.getByRole('button', {
      name: /Quizzes/,
    })
    userEvent.click(button)
    const list = screen.getByRole('list')
    expect(list.children.length).toBe(1)
    expect(list.children[0].textContent).toBe('You do not have quizzes :(')
  })
})
