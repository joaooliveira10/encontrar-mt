import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('renderiza texto Desaparecido', () => {
    render(<StatusBadge status="DESAPARECIDO" />);
    expect(screen.getByText('Desaparecido')).toBeInTheDocument();
  });
  it('renderiza texto Localizada', () => {
  render(<StatusBadge status="LOCALIZADO" />);
  expect(screen.getByText('Localizado')).toBeInTheDocument();
  });
});
