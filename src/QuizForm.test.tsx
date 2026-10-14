import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Simple Quiz', () => {
  test('adds questions, clears the input and enables Play after three questions', async () => {
    const user = userEvent.setup()
    render(<App />)

    const questionInput = screen.getByLabelText('Question')
    const levelSelect = screen.getByLabelText('Difficulty')
    const addButton = screen.getByRole('button', { name: 'Add Question' })
    const playButton = screen.getByRole('button', { name: 'Play' })

    expect(playButton).toBeDisabled()

    await user.type(questionInput, 'What is React?')
    await user.selectOptions(levelSelect, 'Easy')
    await user.click(addButton)

    await user.type(questionInput, 'What is TypeScript?')
    await user.selectOptions(levelSelect, 'Medium')
    await user.click(addButton)

    await user.type(questionInput, 'What is a component?')
    await user.selectOptions(levelSelect, 'Hard')
    await user.click(addButton)

    expect(questionInput).toHaveValue('')
    expect(screen.getByText(/Questions added:/)).toHaveTextContent('3 / 3')
    expect(playButton).toBeEnabled()
  })

  test('displays the selected random question with its difficulty level', async () => {
    const user = userEvent.setup()
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    render(<App />)

    const questionInput = screen.getByLabelText('Question')
    const levelSelect = screen.getByLabelText('Difficulty')
    const addButton = screen.getByRole('button', { name: 'Add Question' })

    for (const [text, level] of [
      ['First question', 'Easy'],
      ['Second question', 'Medium'],
      ['Third question', 'Hard'],
    ] as const) {
      await user.type(questionInput, text)
      await user.selectOptions(levelSelect, level)
      await user.click(addButton)
    }

    await user.click(screen.getByRole('button', { name: 'Play' }))

    expect(
      screen.getByRole('heading', { name: 'Third question' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Hard', { selector: 'span.difficulty-badge' })).toBeInTheDocument()
  })
})
