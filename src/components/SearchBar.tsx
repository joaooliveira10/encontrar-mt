"use client";
import { useEffect, useState } from 'react';

interface Props { 
  onChange: (value: string) => void; 
  initial?: string;
  placeholder?: string;
}

export function SearchBar({ onChange, initial = '', placeholder = "Digite o nome da pessoa..." }: Props) {
  const [value, setValue] = useState(initial);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => { 
    const handler = setTimeout(() => onChange(value), 400); 
    return () => clearTimeout(handler); 
  }, [value, onChange]);

  return (
    <div className="relative max-w-md w-full">
      <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-105' : ''}`}>
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? 'text-red-500' : 'text-gray-400'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          aria-label="Buscar pessoa por nome"
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 text-sm bg-white border-2 rounded-xl shadow-soft 
            transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-100 
            hover:shadow-medium placeholder-gray-400 ${
              isFocused 
                ? 'border-red-300 shadow-medium' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label="Limpar busca"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search suggestions/hint */}
      {isFocused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-lg shadow-medium border border-gray-200 z-10 animate-fade-in">
          <p className="text-xs text-gray-600 flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Digite pelo menos 2 caracteres para buscar</span>
          </p>
        </div>
      )}
    </div>
  );
}
