import React from 'react';

export const Skeleton = ({ className = '', variant = 'text', ...props }) => {
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700/60 rounded';

  const variants = {
    text: 'h-4 w-full rounded-md',
    title: 'h-6 w-3/4 rounded-md',
    avatar: 'w-10 h-10 rounded-full shrink-0',
    card: 'h-32 w-full rounded-xl',
    button: 'h-9 w-24 rounded-lg',
    tableRow: 'h-12 w-full rounded-lg',
  };

  return <div className={`${baseClasses} ${variants[variant] || ''} ${className}`} {...props} />;
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-[#131b2a] rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 py-2 items-center">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} variant="text" className={`h-4 flex-1 ${c === 0 ? 'w-1/3' : ''}`} />
          ))}
        </div>
      ))}
    </div>
  );
};
