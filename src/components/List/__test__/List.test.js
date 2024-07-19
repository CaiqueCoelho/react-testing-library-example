import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import List from '../List'

describe('Hello Component', () => {
  it('should render Hello World text', () => {
    render(<List initialItems={[]} />)
    const h1Element = screen.getByText('Hello World')
    expect(h1Element).toBeInTheDocument()
  })

  it('should render list items', async () => {
    const { rerender } = render(<List initialItems={['Caíque', 'Mariana', 'Ícaro']} />)
    const liElements = screen.getAllByRole('listitem')

    expect(screen.getByText('Caíque')).toBeInTheDocument()
    expect(screen.getByText('Mariana')).toBeInTheDocument()
    expect(screen.getByText('Ícaro')).toBeInTheDocument()
    expect(liElements.length).toBe(3)

    rerender(<List initialItems={['Caíque']} />)
    expect(screen.getByText('Caíque')).toBeInTheDocument()
    await waitFor(() => {
      screen.getByText('Mariana')
    })
  })

  it('should be able to add new item into the list with find', async () => {
    render(<List initialItems={['Caíque', 'Mariana', 'Ícaro']} />)
    expect(screen.getByText('Caíque')).toBeInTheDocument()
    expect(screen.getByText('Mariana')).toBeInTheDocument()
    expect(screen.getByText('Ícaro')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(3)

    const inputElement = screen.getByPlaceholderText('Novo item')
    fireEvent.change(inputElement, { target: { value: 'Novo' } })
    const addButton = screen.getByRole('button', { name: 'Adicionar' })
    expect(addButton).toBeInTheDocument()
    fireEvent.click(addButton)

    expect(screen.getByText('Caíque')).toBeInTheDocument()
    expect(screen.getByText('Mariana')).toBeInTheDocument()
    expect(screen.getByText('Ícaro')).toBeInTheDocument()
    const newItem = await screen.findByText('Novo')
    expect(newItem).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(4)
  })

  it('should be able to add new item into the list with waitFor', async () => {
    render(<List initialItems={['Caíque', 'Mariana', 'Ícaro']} />)
    expect(screen.getByText('Caíque')).toBeInTheDocument()
    expect(screen.getByText('Mariana')).toBeInTheDocument()
    expect(screen.getByText('Ícaro')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(3)

    const inputElement = screen.getByPlaceholderText('Novo item')
    fireEvent.change(inputElement, { target: { value: 'Novo' } })
    const addButton = screen.getByRole('button', { name: 'Adicionar' })
    expect(addButton).toBeInTheDocument()
    fireEvent.click(addButton)

    expect(screen.getByText('Caíque')).toBeInTheDocument()
    expect(screen.getByText('Mariana')).toBeInTheDocument()
    expect(screen.getByText('Ícaro')).toBeInTheDocument()
    await waitFor(() => {
      screen.getByText('Novo')
    })
    expect(screen.getAllByRole('listitem').length).toBe(4)
  })
})

it('should be able to add and remove item from the list', async () => {
  render(<List initialItems={['Caíque']} />)
  expect(screen.getByText('Caíque')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem').length).toBe(1)

  const inputElement = screen.getByPlaceholderText('Novo item')
  fireEvent.change(inputElement, { target: { value: 'Novo' } })
  const addButton = screen.getByText('Adicionar')
  const removeButton = screen.getAllByText('Remover')
  expect(addButton).toBeInTheDocument()
  fireEvent.click(addButton)

  expect(screen.getByText('Caíque')).toBeInTheDocument()
  await waitFor(() => {
    screen.getByText('Novo')
  })
  expect(screen.getAllByRole('listitem').length).toBe(2)

  fireEvent.click(removeButton[0])
  await waitForElementToBeRemoved(() => screen.queryByText('Caíque'))

  // or
  await waitFor(() => {
    expect(screen.queryByText('Caíque')).not.toBeInTheDocument()
  })
  expect(screen.getAllByRole('listitem').length).toBe(1)
})
