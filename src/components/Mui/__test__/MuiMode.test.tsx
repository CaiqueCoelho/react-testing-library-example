import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../test-utils';
import { MuiMode } from '../MuiMode';
import { AppProviders } from '../../../providers/AppProviders';

describe('MuiMode', () => {
 
    test('mode should be dark', () => {
    
        render(<MuiMode />)
        const headingElement = screen.getByRole('heading')
        expect(headingElement).toHaveTextContent('dark mode')
    })
})