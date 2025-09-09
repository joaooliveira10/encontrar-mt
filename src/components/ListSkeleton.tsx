"use client";

export function ListSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Skeleton para filtros */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          <div className="flex-1 space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="lg:w-64 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton para cabeçalho dos resultados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Skeleton para grid de cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Status bar */}
            <div className="h-1 bg-gray-200" />
            
            <div className="p-6">
              {/* Header com foto e info */}
              <div className="flex items-start space-x-4 mb-4">
                {/* Skeleton da foto */}
                <div className="w-20 h-24 bg-gray-200 rounded-lg shrink-0" />
                
                {/* Skeleton das informações */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Skeleton da data */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Skeleton do indicador de ajuda (aleatório) */}
              {Math.random() > 0.5 && (
                <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton para paginação */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center space-x-2">
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
            <div className="hidden sm:flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
