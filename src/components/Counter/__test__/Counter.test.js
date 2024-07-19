import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../Counter'

describe('Counter', () => {
  it('Counter displays correct initial count', () => {
    render(<Counter initialCount={50} />)
    const countValue = screen.getByTestId('count')
    expect(countValue.textContent).toBe('50')
  })

  it('Count should increment by 1 if the increment button is clicked using fireEvent', () => {
    render(<Counter initialCount={50} />)
    const countValue = screen.getByTestId('count')
    expect(countValue.textContent).toBe('50')
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    fireEvent.click(incrementButton)
    expect(countValue.textContent).toBe('51')
  })

  it('Count should increment by 1 if the increment button is clicked using userEvent', async () => {
    render(<Counter initialCount={50} />)
    const countValue = screen.getByTestId('count')
    expect(countValue.textContent).toBe('50')
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await userEvent.click(incrementButton)
    expect(countValue.textContent).toBe('51')
  })
})
