import { render, screen } from '@testing-library/react';
import { Skills } from '../Skills';

describe('Skills', () => {
 
    const skills = ['HTML', 'CSS', 'JavaScript'];

    test('Renders correctly', () => {
        render(<Skills skills={skills} />)    

        const ulTag = screen.getByRole('list')
        expect(ulTag).toBeInTheDocument()
    })
})