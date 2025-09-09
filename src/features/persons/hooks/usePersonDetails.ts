import { Person } from '@/domain/types';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

interface PessoaDTO {
  id: number;
  nome: string;
  idade?: number;
  sexo?: string;
  urlFoto?: string;
  ultimaOcorrencia?: {
    dtDesaparecimento?: string;
    dataLocalizacao?: string;
    ocoId?: number;
  };
}

function mapPessoa(dto: PessoaDTO): Person {
  return {
    id: String(dto.id),
    nome: dto.nome,
    idade: dto.idade,
    sexo: dto.sexo as any,
    fotoUrl: dto.urlFoto,
    dataDesaparecimento: dto.ultimaOcorrencia?.dtDesaparecimento,
    status: dto.ultimaOcorrencia?.dataLocalizacao ? 'LOCALIZADO' : 'DESAPARECIDO',
    ocoId: dto.ultimaOcorrencia?.ocoId,
  };
}

export function usePersonDetails(id: string | undefined) {
  return useQuery<Person, Error>({
    queryKey: ['person', id],
    queryFn: async () => {
      if (!id) throw new Error('ID inválido');
      const { data } = await api.get<PessoaDTO>(`/v1/pessoas/${id}`);
      return mapPessoa(data);
    },
    enabled: !!id,
    staleTime: 60_000,
  });
}
