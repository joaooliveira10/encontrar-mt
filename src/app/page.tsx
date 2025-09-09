'use client';
import dynamic from 'next/dynamic';

// Import PersonsList dinamicamente sem SSR
const PersonsList = dynamic(() => import('./persons-list'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600 font-medium">Carregando registros...</p>
      <p className="text-sm text-gray-500">Aguarde enquanto buscamos as informações</p>
    </div>
  )
});

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Ajude a Encontrar
              <span className="block text-yellow-300">Quem Importa</span>
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed">
              Consulte informações sobre pessoas desaparecidas em Mato Grosso e contribua 
              com informações que podem fazer a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3 text-white font-medium">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Dados oficiais da Polícia Civil MT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-6 text-slate-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Pessoas Desaparecidas</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore os registros abaixo. Se você tiver qualquer informação que possa ajudar, 
            clique no card da pessoa para fornecer detalhes importantes.
          </p>
        </div>

        <PersonsList />
      </section>
    </div>
  );
}

