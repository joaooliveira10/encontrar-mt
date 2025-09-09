import { AppProviders } from '@/components/providers/AppProviders';
import '@/styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Encontrar MT | Pessoas Desaparecidas',
  description: 'Sistema de consulta e informações sobre pessoas desaparecidas em Mato Grosso. Ajude a encontrar quem importa.',
  keywords: 'pessoas desaparecidas, Mato Grosso, busca, encontrar, localizar',
  authors: [{ name: 'Polícia Judiciária Civil de Mato Grosso' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#dc2626',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="glass-effect sticky top-0 z-50 border-b border-white/20 shadow-soft">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-medium">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Encontrar MT</h1>
                    <p className="text-xs text-gray-600">Pessoas Desaparecidas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Polícia Civil MT</span>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            <AppProviders>{children}</AppProviders>
          </main>
          
          <footer className="bg-white/80 backdrop-blur border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600">
                  <p>© 2025 Polícia Judiciária Civil de Mato Grosso</p>
                  <p className="text-xs mt-1">Sistema de consulta de pessoas desaparecidas</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Dados protegidos</span>
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
