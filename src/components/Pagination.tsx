"use client";
import clsx from 'clsx';

interface Props { 
  page: number; 
  pageSize: number; 
  total: number; 
  onPageChange: (p: number) => void; 
}

export function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const disabledPrev = page <= 1;
  const disabledNext = page >= totalPages;
  
  // Calcular páginas para mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Total de páginas visíveis
    
    if (totalPages <= maxVisible) {
      // Mostrar todas as páginas se houver poucas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica mais complexa para muitas páginas
      if (page <= 4) {
        // Início: 1 2 3 4 5 ... última
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        // Fim: 1 ... penúltima-3 penúltima-2 penúltima-1 penúltima última
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // Meio: 1 ... atual-1 atual atual+1 ... última
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = ((page - 1) * pageSize) + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Informações dos resultados */}
        <div className="text-sm text-gray-700">
          <p>
            Mostrando <span className="font-medium">{startItem}</span> até{' '}
            <span className="font-medium">{endItem}</span> de{' '}
            <span className="font-medium">{total}</span> resultados
          </p>
        </div>

        {/* Controles de navegação */}
        <div className="flex items-center space-x-2">
          {/* Botão anterior */}
          <button
            onClick={() => !disabledPrev && onPageChange(page - 1)}
            disabled={disabledPrev}
            className={clsx(
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200',
              disabledPrev
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            )}
            aria-label="Página anterior"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          {/* Números das páginas */}
          <div className="hidden sm:flex items-center space-x-1">
            {pageNumbers.map((pageNum, index) => (
              <div key={index}>
                {pageNum === '...' ? (
                  <span className="px-3 py-2 text-sm text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNum as number)}
                    className={clsx(
                      'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      pageNum === page
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    )}
                    aria-label={`Ir para página ${pageNum}`}
                    aria-current={pageNum === page ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Indicador mobile */}
          <div className="sm:hidden flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg">
            <span className="font-medium">{page}</span>
            <span className="mx-1">de</span>
            <span className="font-medium">{totalPages}</span>
          </div>

          {/* Botão próximo */}
          <button
            onClick={() => !disabledNext && onPageChange(page + 1)}
            disabled={disabledNext}
            className={clsx(
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200',
              disabledNext
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            )}
            aria-label="Próxima página"
          >
            Próxima
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navegação rápida - apenas para muitas páginas */}
      {totalPages > 10 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-xs text-gray-500">
              Navegação rápida
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(1)}
                disabled={page === 1}
                className="px-2 py-1 text-xs text-gray-600 hover:text-red-600 disabled:text-gray-400 transition-colors"
              >
                Primeira
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => onPageChange(Math.ceil(totalPages / 2))}
                className="px-2 py-1 text-xs text-gray-600 hover:text-red-600 transition-colors"
              >
                Meio
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
                className="px-2 py-1 text-xs text-gray-600 hover:text-red-600 disabled:text-gray-400 transition-colors"
              >
                Última
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
