import { render, screen } from '@testing-library/react'
import { Skills } from '../Skills'

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript']

  test('Renders correctly', () => {
    render(<Skills skills={skills} />)

    const ulTag = screen.getByRole('list')
    expect(ulTag).toBeInTheDocument()
  })

  test('Render a list of skills', () => {
    render(<Skills skills={skills} />)
    const listItemElements = screen.getAllByRole('listitem')
    expect(listItemElements).toHaveLength(skills.length)
  })

  test('Make sure when the user is not logged in, the login button is displayed and the button Start learning is not displayed', () => {
    render(<Skills skills={skills} />)
    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toBeInTheDocument()

    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    })
    expect(startLearningButton).not.toBeInTheDocument()
  })

  test('Make sure whrn clicking on the login button, the user is logged in and the button Start learning is displayed and the login button is not displayed', async () => {
    render(<Skills skills={skills} />)
    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toBeInTheDocument()
    loginButton.click()

    const startLearningButton = await screen.findByRole('button', {
      name: 'Start learning',
    })
    expect(startLearningButton).toBeInTheDocument()
    const loginButton2 = screen.queryByRole('button', { name: 'Login' })
    expect(loginButton2).not.toBeInTheDocument()
  })

  test('Start learning button is evenrually displayed', async () => {
    render(<Skills skills={skills} />)
    const startLearningButton = await screen.findByRole('button', { name: 'Start learning' }, { timeout: 2000 })
    expect(startLearningButton).toBeInTheDocument()
  })
})
