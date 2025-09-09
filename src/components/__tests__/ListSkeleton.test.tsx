import { render } from '@testing-library/react';
import { ListSkeleton } from '../ListSkeleton';

describe('ListSkeleton', () => {
  it('renders 6 placeholder cards', () => {
    const { container } = render(<ListSkeleton />);
    const cards = container.querySelectorAll('.animate-pulse');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });
});
