'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const PersonDetails = dynamic(() => import('./person-details'), {
  ssr: false,
  loading: () => (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-48 bg-gray-200 rounded" />
      
      {/* Header skeleton */}
      <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="w-48 h-64 bg-gray-200 rounded-lg shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-5 w-36 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-12 w-36 bg-gray-200 rounded-lg" />
        </div>
      </div>
      
      {/* Form skeleton */}
      <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-100">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-24 w-full bg-gray-200 rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>
          <div className="h-12 w-48 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
});

export default function PersonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="hover:text-red-600 transition-colors duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
            </svg>
            <span>Início</span>
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Detalhes da Pessoa</span>
        </nav>
        
        <PersonDetails />
      </div>
    </div>
  );
}
