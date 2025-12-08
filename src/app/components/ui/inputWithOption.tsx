import * as React from 'react';

import { cn } from '@/lib/styles/utils';

export interface OptionData {
  label: string;
  value: number | string;
}

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionData[];
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, options, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col rounded-lg bg-[#F4F4F5] px-3 py-2">
        <p className="!text-xs">{label}</p>
        <select
          className={cn(
            'placeholder:text-muted-foreground flex h-9 w-full rounded-md border-0 bg-transparent text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
SelectInput.displayName = 'SelectInput';

export { SelectInput };
