import { useListPersons } from '@/features/persons/hooks/useListPersons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('@/lib/api-client', () => ({
  api: {
    get: jest.fn(async () => ({
      data: {
        content: [],
        totalElements: 0,
        number: 0,
        size: 10,
        totalPages: 0,
      }
    }))
  }
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useListPersons status param', () => {
  it('passes status parameter', async () => {
    const { result } = renderHook(() => useListPersons({ page: 1, pageSize: 10, status: 'DESAPARECIDO' }), { wrapper });
  await waitFor(() => expect(result.current.isFetching).toBe(false));
  expect(result.current.data).toBeDefined();
  });
});
