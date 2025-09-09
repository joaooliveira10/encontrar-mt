import { Person } from '@/domain/types';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export interface ListPersonsParams {
  page: number; // 1-based na UI
  pageSize: number;
  nome?: string;
  status?: string;
}

export interface ListPersonsResponse {
  items: Person[];
  total: number; // totalElements
  page: number; // 1-based
  pageSize: number; // size
  totalPages: number;
  fallbackUsed?: boolean; // indica se usamos paginação client-side
  lastPageDetected?: boolean; // não há mais páginas além desta
}

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

interface PagePessoaDTO {
  content: PessoaDTO[];
  totalElements: number;
  number: number; // 0-based
  size: number;
  totalPages: number;
}

function mapPessoa(dto: PessoaDTO): Person {
  const status: Person['status'] = dto.ultimaOcorrencia?.dataLocalizacao ? 'LOCALIZADO' : 'DESAPARECIDO';
  return {
    id: String(dto.id),
    nome: dto.nome,
    idade: dto.idade,
    sexo: dto.sexo as any,
    fotoUrl: dto.urlFoto,
    dataDesaparecimento: dto.ultimaOcorrencia?.dtDesaparecimento,
    status,
  };
}

export function useListPersons(params: ListPersonsParams) {
  return useQuery<ListPersonsResponse, Error>({
    queryKey: ['persons', params],
    queryFn: async () => {
      const { page, pageSize, nome, status } = params;
      const safePage = Math.max(1, page);

      const requestParams: any = {
        pagina: safePage - 1, // API usa 0-based, UI usa 1-based
        porPagina: pageSize,
        nome: nome || '',
        ...(status ? { status } : {}),
        direcao: 'DESC',
      };

      try {
        const { data } = await api.get<PagePessoaDTO>('/v1/pessoas/aberto/filtro', { params: requestParams });

        console.debug('[persons] simple pagination', {
          safePage,
          pageSize,
          requestedPage: safePage - 1,
          returnedPage: data.number,
          totalElements: data.totalElements,
          totalPages: data.totalPages
        });

        return {
          items: data.content.map(mapPessoa),
          total: data.totalElements,
          page: safePage,
          pageSize,
          totalPages: data.totalPages,
          fallbackUsed: false,
          lastPageDetected: false,
        };
      } catch (e: any) {
        if (e.status === 404) {
          return {
            items: [],
            total: 0,
            page: safePage,
            pageSize,
            totalPages: 0,
            fallbackUsed: false,
            lastPageDetected: true
          };
        }
        throw e;
      }
    },
    staleTime: 60_000,
  });
}
