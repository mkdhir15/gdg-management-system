import React from 'react';

const ACCENT_COLORS = {
  blue: {
    iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
    borderHover: 'hover:border-blue-200 dark:hover:border-blue-800',
  },
  green: {
    iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
    borderHover: 'hover:border-emerald-200 dark:hover:border-emerald-800',
  },
  yellow: {
    iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
    borderHover: 'hover:border-amber-200 dark:hover:border-amber-800',
  },
  red: {
    iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
    borderHover: 'hover:border-rose-200 dark:hover:border-rose-800',
  },
  purple: {
    iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
    borderHover: 'hover:border-purple-200 dark:hover:border-purple-800',
  },
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'blue',
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  className = '',
}) => {
  const colorStyle = ACCENT_COLORS[accent] || ACCENT_COLORS.blue;

  return (
    <div
      className={`bg-white dark:bg-[#131b2a] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-[0_1px_3px_0_rgba(60,64,67,0.06)] dark:shadow-[0_1px_3px_0_rgba(0,0,0,0.3)] transition-all duration-200 ${colorStyle.borderHover} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorStyle.iconBg}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h4>
        {trend && (
          <span
            className={`text-xs font-semibold inline-flex items-center ${
              trendType === 'up'
                ? 'text-emerald-600 dark:text-emerald-400'
                : trendType === 'down'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {trendType === 'up' && '↑ '}
            {trendType === 'down' && '↓ '}
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{subtitle}</p>
      )}
    </div>
  );
};
