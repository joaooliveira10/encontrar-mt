"use client";

const OPTIONS: { label: string; value: string; icon: string; color: string }[] = [
  { label: 'Todos os status', value: '', icon: 'list', color: 'text-gray-600' },
  { label: 'Desaparecidos', value: 'DESAPARECIDO', icon: 'alert', color: 'text-red-600' },
  { label: 'Localizados', value: 'LOCALIZADO', icon: 'check', color: 'text-green-600' },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function StatusFilter({ value, onChange }: Props) {
  const selectedOption = OPTIONS.find(opt => opt.value === value) || OPTIONS[0];

  return (
    <div className="relative">
      <div className="block text-sm font-medium text-gray-700 mb-2">
        Filtrar por status
      </div>
      
      <div className="relative">
        <select
          className="appearance-none w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm shadow-soft hover:border-gray-300 focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 cursor-pointer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filtrar por status"
        >
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Status indicator */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className={`w-2 h-2 rounded-full ${
            value === 'DESAPARECIDO' ? 'bg-red-500' : 
            value === 'LOCALIZADO' ? 'bg-green-500' : 
            'bg-gray-300'
          }`} />
        </div>
      </div>

      {/* Visual summary */}
      <div className="mt-2 flex items-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {value === 'DESAPARECIDO' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          ) : value === 'LOCALIZADO' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          )}
        </svg>
        <span>Mostrando: {selectedOption.label.toLowerCase()}</span>
      </div>
    </div>
  );
}
