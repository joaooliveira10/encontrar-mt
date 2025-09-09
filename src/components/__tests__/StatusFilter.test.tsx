import { fireEvent, render, screen } from '@testing-library/react';
import { StatusFilter } from '../StatusFilter';

describe('StatusFilter', () => {
  it('render options and change value', () => {
  const handle = jest.fn();
    render(<StatusFilter value="" onChange={handle} />);
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'DESAPARECIDO' } });
    expect(handle).toHaveBeenCalledWith('DESAPARECIDO');
  });
});
