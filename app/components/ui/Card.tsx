'use client';

import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  shimmerBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow, shimmerBorder, children, ...props }, ref) => {
    return (
      <div className="relative group h-full" ref={ref} {...props}>
        {glow && (
          <div className="absolute -inset-0.5 bg-brand-orange/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
        )}
        <div className={cn(
          "relative bg-navy-surface border border-navy-border rounded-2xl p-6 overflow-hidden h-full",
          className
        )}>
          {shimmerBorder && (
            <div className="absolute inset-0 rounded-2xl border border-transparent [background:linear-gradient(45deg,transparent_25%,rgba(243,89,23,0.2)_50%,transparent_75%)_border-box] [background-size:200%_200%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
          )}
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = 'Card';
