import * as React from 'react';

import { cn } from '@/lib/styles/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col rounded-lg bg-[#F4F4F5] px-3 py-2">
        <p className="!text-xs">{label}</p>
        <input
          type={type}
          className={cn(
            ' placeholder:text-muted-foreground  flex h-9 w-full rounded-md  bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
