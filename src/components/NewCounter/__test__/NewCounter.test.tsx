import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewCounter } from '../NewCounter'

describe('NewCounter', () => {
  test('Renders the NewCounter component', async () => {
    render(<NewCounter />)
    const newCounter = screen.getByRole('heading')
    expect(newCounter).toBeInTheDocument()
    expect(newCounter).toHaveTextContent('0')

    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    expect(incrementButton).toBeInTheDocument()
    await userEvent.click(incrementButton)
    expect(newCounter).toHaveTextContent('1')
  })

  test('renders a count of 2 after clicking the increment button twice', async () => {
    render(<NewCounter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await userEvent.dblClick(incrementButton)

    const counterH1 = await screen.findByRole('heading')
    expect(counterH1).toHaveTextContent('2')
  })

  test('renders a count of 10 after clicking the set button', async () => {
    render(<NewCounter />)

    const amountInput = screen.getByRole('spinbutton')
    await userEvent.type(amountInput, '10')

    const setButton = screen.getByRole('button', { name: 'Set' })
    await userEvent.click(setButton)
    expect(amountInput).toHaveValue(10)

    const counterH1 = await screen.findByRole('heading')
    expect(counterH1).toHaveTextContent('10')
  })

  test('Elements are focused in the right order', async () => {
    render(<NewCounter />)
    const amountInput = screen.getByRole('spinbutton')
    const setButton = screen.getByRole('button', { name: 'Set' })
    const incrementButton = screen.getByRole('button', { name: 'Increment' })

    await userEvent.tab()
    expect(incrementButton).toHaveFocus()

    await userEvent.tab()
    expect(amountInput).toHaveFocus()

    await userEvent.tab()
    expect(setButton).toHaveFocus()
  })
})
