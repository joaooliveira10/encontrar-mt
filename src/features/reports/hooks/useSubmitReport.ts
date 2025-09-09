import { ReportInput } from '@/domain/types';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function buildFormData(input: ReportInput) {
  const fd = new FormData();
  input.arquivos?.forEach((f) => fd.append('files', f));
  return fd;
}

export function useSubmitReport(ocoId: number | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Omit<ReportInput, 'ocoId'>) => {
      if (!ocoId) throw new Error('Ocorrência indisponível');
      const formData = buildFormData({ ...input, ocoId });
      const params = new URLSearchParams();
      params.set('informacao', input.informacao);
      if (input.descricao) params.set('descricao', input.descricao);
      if (input.data) params.set('data', input.data);
      params.set('ocoId', String(ocoId));
      const { data } = await api.post(`/v1/ocorrencias/informacoes-desaparecido?${params.toString()}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      if (ocoId) qc.invalidateQueries({ queryKey: ['person'] });
    },
  });
}
