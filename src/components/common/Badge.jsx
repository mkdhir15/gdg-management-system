import React from 'react';

const VARIANT_MAP = {
  blue: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  green: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  yellow: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  red: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  gray: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

export const Badge = ({
  children,
  variant = 'blue',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1 font-medium',
  };

  const selectedVariant = VARIANT_MAP[variant] || VARIANT_MAP.blue;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${selectedVariant} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'green'
              ? 'bg-emerald-500'
              : variant === 'red'
              ? 'bg-rose-500'
              : variant === 'yellow'
              ? 'bg-amber-500'
              : variant === 'purple'
              ? 'bg-purple-500'
              : 'bg-blue-500'
          }`}
        />
      )}
      {children}
    </span>
  );
};
