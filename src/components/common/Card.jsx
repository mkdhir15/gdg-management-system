import React from 'react';

export const Card = ({
  children,
  className = '',
  interactive = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#131b2a] rounded-xl border border-slate-200 dark:border-slate-800/90 shadow-[0_1px_3px_0_rgba(60,64,67,0.06)] dark:shadow-[0_1px_3px_0_rgba(0,0,0,0.3)] ${
        interactive
          ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_4px_12px_rgba(60,64,67,0.08)] hover:-translate-y-0.5 transition-all duration-200'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div
      className={`px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 ${className}`}
    >
      {title ? (
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      ) : (
        children
      )}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div
      className={`px-5 py-3.5 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 rounded-b-xl flex items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
};
