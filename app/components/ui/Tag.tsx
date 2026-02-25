'use client';

import React from 'react';
import { cn } from './Button';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'orange' | 'blue' | 'green';
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'orange', children, ...props }, ref) => {
    const variants = {
      orange: "bg-[rgba(243,89,23,0.12)] text-brand-orange border-[rgba(243,89,23,0.25)]",
      blue: "bg-[rgba(160,171,219,0.12)] text-brand-blue-gray border-[rgba(160,171,219,0.25)]",
      green: "bg-[rgba(34,197,94,0.12)] text-green-400 border-[rgba(34,197,94,0.25)]"
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.12em]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Tag.displayName = 'Tag';
