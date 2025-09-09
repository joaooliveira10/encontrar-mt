"use client";
import { Pagination } from '@/components/Pagination';
import { PersonCard } from '@/components/PersonCard';
import { SearchBar } from '@/components/SearchBar';
import type { Person } from '@/domain/types';
import { useListPersons, type ListPersonsResponse } from '@/features/persons/hooks/useListPersons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ListSkeleton } from '../components/ListSkeleton';
import { StatusFilter } from '../components/StatusFilter';

const PAGE_SIZE = 10;

export default function PersonsList() {
  const params = useSearchParams();
  const router = useRouter();
  const page = Number(params?.get('page') || '1');
  const nome = params?.get('nome') || '';
  const status = params?.get('status') || '';
  const { data, isLoading, isError, error } = useListPersons({ 
    page, 
    pageSize: PAGE_SIZE, 
    nome: nome || undefined, 
    status: status || undefined 
  });
  const list = data as ListPersonsResponse | undefined;
  
  useEffect(() => { 
    if (isError && error) {
      toast.error('Falha ao carregar lista de pessoas', {
        duration: 4000,
        icon: '⚠️',
      }); 
    }
  }, [isError, error]);

  function updateQuery(next: Record<string, string | number | undefined>) {
    const current = new URLSearchParams();
    params?.forEach((value: string, key: string) => current.set(key, value));
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === '') current.delete(k); 
      else current.set(k, String(v));
    });
    // Garantir valor mínimo de página
    const p = Number(current.get('page') || '1');
    if (p < 1) current.set('page', '1');
    router.push(('?' + current.toString()) as any);
  }

  // Filtros ativos
  const hasActiveFilters = nome || status;
  const isDesaparecidoFilter = status === 'DESAPARECIDO';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Filtros e busca */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar Pessoa</span>
            </h3>
            <SearchBar
              initial={nome}
              onChange={(value: string) => updateQuery({ nome: value, page: 1 })}
              placeholder="Digite o nome da pessoa..."
            />
          </div>
          
          <div className="lg:w-64">
            <StatusFilter 
              value={status} 
              onChange={(v: string) => updateQuery({ status: v || undefined, page: 1 })} 
            />
          </div>
        </div>

        {/* Indicadores de filtros ativos */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Filtros ativos:</span>
                <div className="flex items-center space-x-2">
                  {nome && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Nome: &quot;{nome}&quot;
                    </span>
                  )}
                  {status && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isDesaparecidoFilter ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {isDesaparecidoFilter ? 'Desaparecidos' : 'Localizados'}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => updateQuery({ nome: undefined, status: undefined, page: 1 })}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Limpar filtros</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estados de carregamento e avisos */}
      {isLoading && <ListSkeleton />}
      
      {/* Avisos da API */}
      {list?.fallbackUsed && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Modo de contingência ativo</p>
            <p className="text-xs text-amber-700 mt-1">
              Paginação do backend indisponível. Exibindo página {page} via fallback local.
            </p>
          </div>
        </div>
      )}

      {list?.lastPageDetected && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-800">
            Última página detectada com base nos registros retornados.
          </p>
        </div>
      )}

      {/* Erro */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-sm text-red-700 mb-4">{error?.message || 'Ocorreu um erro inesperado'}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Lista vazia */}
      {list && list.items.length === 0 && !isLoading && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pessoa encontrada</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {hasActiveFilters 
              ? 'Não encontramos registros com os filtros aplicados. Tente ajustar os critérios de busca.'
              : 'Não há registros disponíveis no momento.'
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => updateQuery({ nome: undefined, status: undefined, page: 1 })}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ver todos os registros
            </button>
          )}
        </div>
      )}

      {/* Grid de pessoas */}
      {list && list.items.length > 0 && (
        <div className="space-y-6">
          {/* Cabeçalho dos resultados */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <span>Resultados encontrados</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {list.total}
              </span>
            </h3>
            
            {list.total > 0 && (
              <p className="text-sm text-gray-600">
                Página {page} de {Math.ceil(list.total / PAGE_SIZE)}
              </p>
            )}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.items.map((person: Person, index: number) => (
              <div key={person.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PersonCard person={person} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paginação */}
      {list && list.totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <Pagination
            page={page}
            pageSize={list.pageSize}
            total={list.total}
            onPageChange={(p: number) => updateQuery({ page: p })}
          />
        </div>
      )}
    </div>
  );
}
