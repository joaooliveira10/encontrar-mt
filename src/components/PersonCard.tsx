import { Person } from '@/domain/types';
import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from './StatusBadge';

// Cache simples de URLs que já falharam (404) para evitar novas requisições
const failedImages = new Set<string>();

interface Props { person: Person; }

export function PersonCard({ person }: Props) {
  const isDesaparecido = person.status === 'DESAPARECIDO';
  
  return (
    <Link
      href={`/pessoa/${person.id}`}
      className="group relative bg-white rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden transform hover:-translate-y-1 animate-fade-in"
    >
      {/* Status indicator border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isDesaparecido ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`} />
      
      <div className="p-6">
        {/* Header with photo and basic info */}
        <div className="flex items-start space-x-4 mb-4">
          {/* Photo container */}
          <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shrink-0 shadow-medium">
            {person.fotoUrl && !failedImages.has(person.fotoUrl) ? (
              <Image
                src={person.fotoUrl}
                alt={`Foto de ${person.nome}`}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
                onError={(e: any) => {
                  if (person.fotoUrl) failedImages.add(person.fotoUrl);
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent && !parent.querySelector('[data-fallback]')) {
                    const fallback = document.createElement('div');
                    fallback.dataset.fallback = 'true';
                    fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold text-lg';
                    fallback.textContent = person.nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold text-lg">
                {person.nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()}
              </div>
            )}
            
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Name and status */}
          <div className="flex-1 min-w-0">
            {/* Status badge at the top */}
            <div className="flex justify-end mb-2">
              <StatusBadge status={person.status} size="sm" />
            </div>
            
            {/* Name below status */}
            <div className="mb-2">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-red-600 transition-colors leading-tight break-words" title={person.nome}>
                {person.nome}
              </h3>
            </div>
            
            {/* Additional info */}
            <div className="space-y-1">
              {person.idade && (
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{person.idade} anos</span>
                </p>
              )}
              
              {person.cidade && (
                <p className="text-sm text-gray-600 flex items-center space-x-1 truncate">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span title={`${person.cidade}${person.estado ? ` - ${person.estado}` : ''}`}>
                    {person.cidade}{person.estado ? ` - ${person.estado}` : ''}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Date info */}
        {person.dataDesaparecimento && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Desde: {new Date(person.dataDesaparecimento).toLocaleDateString('pt-BR')}</span>
              </p>
              
              {/* Action indicator */}
              <div className="text-xs text-gray-400 group-hover:text-red-500 transition-colors flex items-center space-x-1">
                <span>Ver detalhes</span>
                <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Help indicator for missing persons */}
        {isDesaparecido && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs text-red-700 font-medium flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Clique para fornecer informações</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
