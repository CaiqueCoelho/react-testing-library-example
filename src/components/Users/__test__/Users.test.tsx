import { Users } from '../users';
import { rest } from 'msw'
import { render, screen } from '@testing-library/react';
import {server } from '../../../mocks/node'

describe('Users', () => {
 
    test('should render users', async () => {
        render(<Users />)
        const headingElement = await screen.findByRole('heading')
        expect(headingElement).toHaveTextContent('Users')
    })

    test('should render a list of users', async () => {
        render(<Users />)
        const users = await screen.findAllByRole('listitem')
        expect(users).toHaveLength(3)
        const findUserCaique = await screen.findByText('Caíque Coelho')
        expect(findUserCaique).toBeInTheDocument()
    })

    test('renders error', async () => {
        server.use(
            rest.get(
                'https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                    return res(ctx.status(500))
                }
            )
        )
        render(<Users />)
        const error = await screen.findByText('Error fetching users')
        expect(error).toBeInTheDocument()
    })
})