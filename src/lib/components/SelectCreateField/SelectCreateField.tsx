/* eslint-disable import/no-extraneous-dependencies */
import { useForkRef } from '@mui/material';
import type { ElementType, SelectHTMLAttributes } from 'react';
import { forwardRef, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/styles/utils';

export type TSelectFieldProps = {
  addonLeft?: ElementType;
  addonRight?: ElementType;
  label?: string;
  disabled?: boolean;
  isError?: boolean;
  caption?: string;
  placeholder?: string;
  name: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

// eslint-disable-next-line react/display-name
const SelectCreateField = forwardRef<HTMLSelectElement, TSelectFieldProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      label,
      disabled,
      isError,
      caption,
      children,
      name,
      ...rest
    } = props;

    const selectRef = useRef<HTMLSelectElement>();
    const handleRef = useForkRef(selectRef, ref);
    const { setValue } = useFormContext();

    return (
      <div>
        <div className="flex w-full flex-col rounded-lg bg-[#F4F4F5] px-3 py-2">
          <p className="!text-xs font-bold">{label}</p>
          <select
            className={cn(
              'flex-grow bg-transparent text-gray-500 focus:outline-none',
              className
            )}
            ref={handleRef}
            onChange={(e) => setValue(name, e.target.value)}
            disabled={disabled}
            {...rest}
          >
            {children}
          </select>
        </div>
        {caption && (
          <div
            className={cn(
              'ml-1 mt-[6px] text-sm',
              isError ? 'text-error-500' : 'text-gray-500'
            )}
          >
            {caption}
          </div>
        )}
      </div>
    );
  }
);

export default SelectCreateField;
