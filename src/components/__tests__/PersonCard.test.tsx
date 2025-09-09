import type { Person } from '@/domain/types';
import { render, screen } from '@testing-library/react';
import { PersonCard } from '../PersonCard';

const mockPerson: Person = {
  id: '1',
  nome: 'Fulano da Silva',
  status: 'DESAPARECIDO',
  cidade: 'Cuiabá',
  estado: 'MT',
};

describe('PersonCard', () => {
  it('exibe nome e cidade', () => {
    render(<PersonCard person={mockPerson} />);
    expect(screen.getByText('Fulano da Silva')).toBeInTheDocument();
    expect(screen.getByText(/Cuiabá/)).toBeInTheDocument();
  });
});
