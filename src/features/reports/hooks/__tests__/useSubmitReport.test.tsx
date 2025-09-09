import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useSubmitReport } from '../useSubmitReport';

jest.mock('@/lib/api-client', () => ({
  api: {
    post: jest.fn(async () => ({ data: { ok: true } }))
  }
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useSubmitReport', () => {
  it('envia informacao com parametros corretos', async () => {
    const { result } = renderHook(() => useSubmitReport(123), { wrapper });
    await act(async () => {
      result.current.mutate({ informacao: 'Vista em local X', descricao: 'Foto', data: '2025-01-01', arquivos: [] });
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
