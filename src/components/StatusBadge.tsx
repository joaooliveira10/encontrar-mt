import clsx from 'clsx';

interface Props { status: 'DESAPARECIDO' | 'LOCALIZADO'; size?: 'sm' | 'md' | 'lg'; }

export function StatusBadge({ status, size = 'md' }: Props) {
  const isDesaparecido = status === 'DESAPARECIDO';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center font-bold rounded-full shadow-soft transition-all duration-200',
        sizeClasses[size],
        isDesaparecido 
          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200 hover:shadow-red-300' 
          : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200 hover:shadow-green-300'
      )}
    >
      <svg 
        className={clsx('mr-1', size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        {isDesaparecido ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
      </svg>
      {isDesaparecido ? 'Desaparecido' : 'Localizado'}
    </span>
  );
}
