import { render, screen } from '@testing-library/react';
import Greet from '../Greet';

test('Greet Render correctly', () => {
  render(<Greet />);
  const hello = screen.getByText(/Hello Guest/i);
  expect(hello).toBeInTheDocument();
});

test('Greet render with a name', () => {
  render(<Greet name='Caíque' />);
  const textCaique = screen.getByText('Hello Caíque');
  expect(textCaique).toBeInTheDocument();
});
